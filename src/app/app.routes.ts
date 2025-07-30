import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { LeaveRequestComponent } from './components/leave-request/leave-request';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'apply-leave',
    component: LeaveRequestComponent,
    canActivate: [authGuard]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
