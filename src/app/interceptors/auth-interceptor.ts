import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('token');

const isApiUrl = req.url.startsWith(environment.apiUrl);

  const isLoginUrl = req.url.includes('/api/auth/login');

  if (token && isApiUrl && !isLoginUrl) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }

  return next(req);
};
