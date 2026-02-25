import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserList } from './user-list';
import { UserService } from '../../services/account/UserService';
import { of } from 'rxjs';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('UserList', () => {
  let component: UserList;
  let fixture: ComponentFixture<UserList>;
  let userServiceSpy: any;

  beforeEach(async () => {
    userServiceSpy = {
      listUsers: vi.fn().mockReturnValue(of({ content: [], totalElements: 0 }))
    };

    await TestBed.configureTestingModule({
      imports: [UserList, NoopAnimationsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: UserService, useValue: userServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserList);
    component = fixture.componentInstance;

    vi.spyOn(component, 'loadUsers').mockImplementation(() => {});
  });

  it('deve passar no build básico', () => {
    expect(component).toBeTruthy();
  });
});
