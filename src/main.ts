import 'zone.js'; // Required by Angular

import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

import { MsalService, MSAL_INSTANCE, MsalBroadcastService, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';

import { msalConfig } from './app/auth/msal.config';
import { ReactiveFormsModule } from '@angular/forms';


// ✅ MANUAL MSAL INSTANCE CREATION WITH INITIALIZATION
const msalInstance = new PublicClientApplication(msalConfig);

// 👇 Wrap bootstrap in an async IIFE to allow `await`
(async () => {
  await msalInstance.initialize(); // ✅ THIS FIXES THE ERROR

  bootstrapApplication(App, {
    providers: [
      provideRouter(routes),
      provideHttpClient(withInterceptorsFromDi()),
      importProvidersFrom(ReactiveFormsModule),

      {
        provide: MSAL_INSTANCE,
        useValue: msalInstance // ✅ provide initialized instance
      },
      {
        provide: MSAL_GUARD_CONFIG,
        useValue: {
          interactionType: InteractionType.Redirect,
          authRequest: {
            scopes: ['user.read']
          }
        }
      },
      MsalService,
      MsalBroadcastService
    ]
  }).catch(err => console.error(err));

  await msalInstance.initialize();
  await msalInstance.handleRedirectPromise(); // 👈 Important!

})();
