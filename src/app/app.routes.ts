import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: 'users',
    canActivate: [authGuard],
    loadComponent: () => import('./components/user-list/user-list').then(m => m.UserList)
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
