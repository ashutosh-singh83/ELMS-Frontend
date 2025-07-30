import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: `login.html`,
  styleUrl:'login.css'
})
export class LoginComponent {
  constructor(private msal: MsalService) {}

  login() {
    this.msal.loginRedirect();
  }
}
