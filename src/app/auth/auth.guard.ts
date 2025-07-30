import { inject } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const msal = inject(MsalService);
  const router = inject(Router);

  const isLoggedIn = msal.instance.getAllAccounts().length > 0;

  if (!isLoggedIn) {
    router.navigate(['/login']);
    return false;
  }
  
  return true;
};
