import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = sessionStorage.getItem('token');

  const cleanApiUrl = environment.apiUrl.replace(/\/$/, '');

  const isApiUrl = req.url.includes(cleanApiUrl);
  const isLoginUrl = req.url.includes('/api/auth/login');

  let authReq = req;

  if (token && isApiUrl && !isLoginUrl) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.warn('Token expirado ou inválido. Redirecionando para login...');
        authService.logout();
      }
      return throwError(() => error);
    })
  );
};
