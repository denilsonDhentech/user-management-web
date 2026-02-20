import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { authGuard } from './guards/auth.guard';
import { UserCreate } from './components/user-create/user-create';

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
    path: 'users/new',
    component: UserCreate
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
