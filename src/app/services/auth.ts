// src/app/services/auth.ts
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest, AuthResponse } from '../models/auth';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  // Signal crucial para esconder a Navbar
  isAuthenticated = signal<boolean>(!!localStorage.getItem('token'));

  login(credentials: LoginRequest) {
    return this.http.post<AuthResponse>('/api/auth/login', credentials).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        this.isAuthenticated.set(true); // Isso fará a Navbar aparecer instantaneamente
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthenticated.set(false); // Isso esconderá a Navbar
    window.location.href = '/login';
  }
}
