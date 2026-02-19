import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginRequest, AuthResponse } from '../models/auth';
import { tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

// Interface para mapear os campos da sua API
interface MyJwtPayload {
  sub?: string;
  email?: string;
  role?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private readonly TOKEN_KEY = 'token';

  private tokenSignal = signal<string | null>(localStorage.getItem(this.TOKEN_KEY));

  isAuthenticated = computed(() => !!this.tokenSignal());

  userRole = computed(() => {
    const token = this.tokenSignal();
    if (!token) return null;
    try {
      const decoded = jwtDecode<MyJwtPayload>(token);
      return decoded.role || null;
    } catch (error) {
      console.error('Erro ao decodificar token:', error);
      return null;
    }
  });

  userEmail = computed(() => {
    const token = this.tokenSignal();
    if (!token) return null;
    try {
      const decoded = jwtDecode<MyJwtPayload>(token);
      return decoded.sub || decoded.email || null;
    } catch {
      return null;
    }
  });

  getUserEmail(): string | null {
    return this.userEmail();
  }

  isAdmin = computed(() => this.userRole() === 'ADMIN');

  login(credentials: LoginRequest) {
    return this.http.post<AuthResponse>('/api/auth/login', credentials).pipe(
      tap(res => {
        localStorage.setItem(this.TOKEN_KEY, res.token);
        this.tokenSignal.set(res.token);
      })
    );
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.tokenSignal.set(null);
    this.router.navigate(['/login']);
  }
}
