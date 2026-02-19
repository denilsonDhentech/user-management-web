import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { UrlTree } from '@angular/router';
import { vi, describe, it, expect, beforeEach } from 'vitest'; // Adicione os imports do Vitest

describe('authGuard', () => {
  let authServiceSpy: any;
  let routerSpy: any;

  beforeEach(() => {
    // No Vitest, criamos mocks assim:
    authServiceSpy = {
      isAuthenticated: vi.fn()
    };
    routerSpy = {
      parseUrl: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });
  });

  it('deve permitir acesso quando o usuário está autenticado', () => {
    authServiceSpy.isAuthenticated.mockReturnValue(true); // Sintaxe Vitest

    const result = TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));
    expect(result).toBe(true);
  });

  it('deve redirecionar para /login quando não está autenticado', () => {
    authServiceSpy.isAuthenticated.mockReturnValue(false);
    const mockUrlTree = {} as UrlTree;
    routerSpy.parseUrl.mockReturnValue(mockUrlTree);

    const result = TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));
    expect(result).toBe(mockUrlTree);
  });
});
