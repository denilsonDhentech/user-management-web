import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from './login';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let authServiceSpy: any;
  let routerSpy: any;

  beforeEach(async () => {
    authServiceSpy = {
      login: vi.fn()
    };
    routerSpy = {
      navigate: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente de login', () => {
    expect(component).toBeTruthy();
  });

  it('deve navegar para /users quando o login for bem-sucedido', () => {
    authServiceSpy.login.mockReturnValue(of({ token: 'jwt-token-valido' }));

    component.email.set('admin@teste.com');
    component.password.set('123456');

    component.handleLogin();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/users']);
  });

  it('deve exibir mensagem de erro quando as credenciais forem inválidas', () => {
    authServiceSpy.login.mockReturnValue(throwError(() => new Error('Invalid credentials')));

    component.email.set('errado@teste.com');
    component.password.set('senha-errada');

    component.handleLogin();

    expect(component.errorMessage()).toBe('E-mail ou senha incorretos.');
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});
