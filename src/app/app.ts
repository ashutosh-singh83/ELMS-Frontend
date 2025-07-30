import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService, MsalBroadcastService } from '@azure/msal-angular';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { EventMessage, EventType, AuthenticationResult } from '@azure/msal-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('elms-frontend');
  username: string | null = null;

  constructor(
    private msalService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Handle MSAL Login Success
    this.msalBroadcastService.msalSubject$
      .subscribe((event: EventMessage) => {
        if (event.eventType === EventType.LOGIN_SUCCESS) {
          const result = event.payload as AuthenticationResult;
          this.msalService.instance.setActiveAccount(result.account);
          this.username = result.account?.username ?? null;

          // ✅ Redirect to main page after login
          this.router.navigate(['/apply-leave']);
        }
      });

    // Handle existing login
    const account = this.msalService.instance.getActiveAccount()
      ?? this.msalService.instance.getAllAccounts()[0];

    if (account) {
      this.username = account.username;
      this.msalService.instance.setActiveAccount(account);
    }
  }

  logout() {
    this.msalService.logoutRedirect({
      postLogoutRedirectUri: 'http://localhost:4200/login'
    });
  }

  isLoggedIn(): boolean {
    return this.msalService.instance.getAllAccounts().length > 0;
  }
}
