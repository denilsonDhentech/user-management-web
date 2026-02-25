import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginRequest, LoginResponse } from '../models/auth';
import { tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

interface MyJwtPayload {
  sub?: string;
  username?: string;
  role?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private readonly TOKEN_KEY = 'token';
  private readonly USER_KEY = 'username';
  private readonly ROLE_KEY = 'role';

  private tokenSignal = signal<string | null>(sessionStorage.getItem(this.TOKEN_KEY));
  public userName = signal<string | null>(sessionStorage.getItem(this.USER_KEY));
  public userRole = signal<string | null>(sessionStorage.getItem(this.ROLE_KEY));

  isAuthenticated = computed(() => !!this.tokenSignal());
  isAdmin = computed(() => this.userRole() === 'ADMIN');


  isUser = computed(() => this.userRole() === 'USER' || this.userRole() === 'ADMIN');
  isViewer = computed(() => !!this.userRole());

login(credentials: LoginRequest) {
    return this.http.post<LoginResponse>('/api/auth/login', credentials).pipe(
      tap(res => {
        sessionStorage.setItem(this.TOKEN_KEY, res.token);
        sessionStorage.setItem(this.USER_KEY, res.username);
        sessionStorage.setItem(this.ROLE_KEY, res.role);

        this.tokenSignal.set(res.token);
        this.userName.set(res.username);
        this.userRole.set(res.role);
      })
    );
  }

logout() {
    sessionStorage.clear();
    this.tokenSignal.set(null);
    this.userName.set(null);
    this.userRole.set(null);
    this.router.navigate(['/login']);
  }
}
