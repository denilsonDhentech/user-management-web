import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserList } from './user-list';
import { UserService } from '../../services/UserService';
import { of } from 'rxjs';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('UserList', () => {
  let component: UserList;
  let fixture: ComponentFixture<UserList>;
  let userServiceSpy: any;

  beforeEach(async () => {
    userServiceSpy = {
      listUsers: vi.fn().mockReturnValue(of({ content: [], totalElements: 0 }))
    };

    await TestBed.configureTestingModule({
      imports: [UserList],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: UserService, useValue: userServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserList);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('deve criar o componente de listagem de usuários', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar o serviço de usuários ao iniciar', () => {
    expect(userServiceSpy.listUsers).toHaveBeenCalled();
  });

  it('deve carregar a lista de usuários no sinal (signal) ao iniciar', () => {
    const mockUsers = [{ id: 1, name: 'DhenSouza', email: 'dhen@souza.com' }];
    userServiceSpy.listUsers.mockReturnValue(of({ content: mockUsers, totalElements: 1 }));

    component.loadUsers();

    expect(component.users().length).toBe(1);
    expect(component.users()[0].name).toBe('DhenSouza');
  });
});
