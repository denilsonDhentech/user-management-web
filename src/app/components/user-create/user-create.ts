import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';
import { UserService } from '../../services/UserService';
import { UserCreateRequest } from '../../models/user.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-create',
  imports: [
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    MessageModule],
  templateUrl: './user-create.html',
  styleUrl: './user-create.scss',
})
export class UserCreate {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  private userService = inject(UserService);
  private messageService = inject(MessageService);

  loading = signal(false);

  userForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    if (this.userForm.valid) {
      this.loading.set(true);

      const newUser = this.userForm.value as UserCreateRequest;

      this.userService.createUser(newUser).subscribe({
        next: (response) => {
          this.loading.set(false);
          this.router.navigate(['/users']);
        },
        error: (err) => {
          this.loading.set(false);
          console.error('Erro ao criar usuário:', err);

          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Falha ao salvar usuário.'
          });
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/users']);
  }
}
