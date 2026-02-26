import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { authGuard } from './guards/auth.guard';
import { AuditList } from './components/audit/audit-list';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: 'documents',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/document-list/document-list').then(m => m.DocumentList)
  },
  {
    path: 'documents/upload',
    loadComponent: () => import('./components/document-upload/document-upload').then(m => m.DocumentUpload),
    canActivate: [authGuard]
  },
  {
    path: 'users',
    canActivate: [authGuard],
    loadComponent: () => import('./components/user-list/user-list').then(m => m.UserList)
  },
  {
    path: 'audit',
    component: AuditList,
    canActivate: [authGuard]
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
