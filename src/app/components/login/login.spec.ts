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

  it('deve navegar para /documents quando o login for bem-sucedido', () => {
    authServiceSpy.login.mockReturnValue(of({ token: 'jwt-token-valido' }));

    component.username.set('denilson_souza');
    component.password.set('123456');

    component.handleLogin();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/documents']);
  });

  it('deve exibir mensagem de erro quando as credenciais forem inválidas', () => {
    authServiceSpy.login.mockReturnValue(throwError(() => new Error('Invalid credentials')));

    component.username.set('usuario_invalido');
    component.password.set('senha-errada');

    component.handleLogin();

    expect(component.errorMessage()).toBe('Usuário ou senha incorretos.');
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});
