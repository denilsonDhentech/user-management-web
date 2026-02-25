import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserCreate } from './user-create';
import { MessageService } from 'primeng/api';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('UserCreate', () => {
  let component: UserCreate;
  let fixture: ComponentFixture<UserCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCreate, NoopAnimationsModule],
      providers: [
        MessageService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        provideNoopAnimations() 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCreate);
    component = fixture.componentInstance;

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
