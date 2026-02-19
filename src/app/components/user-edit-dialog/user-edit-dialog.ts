import { Component, EventEmitter, Input, Output, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { UserResponse, UserUpdateRequest } from '../../models/user.model';
import { UserService } from '../../services/UserService';

import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-user-edit-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, DialogModule, ButtonModule, InputTextModule, PasswordModule],
  templateUrl: '../user-edit-dialog/user-edit-dialog.html',
  styleUrl: '../user-edit-dialog/user-edit-dialog.scss'
})
export class UserEditDialog {
  private userService = inject(UserService);

  @Input() visible = false;
  @Input() set user(data: UserResponse | null) {
    if (data) {
      this.userId = data.id;
      this.editData.set({
        name: data.name,
        email: data.email,
        password: ''
      });
    }
  }

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() onSave = new EventEmitter<void>();

  private userId: string = '';

  editData = signal<UserUpdateRequest>({
    name: '',
    email: '',
    password: ''
  });
  loading = signal(false);

  close() {
    this.visibleChange.emit(false);
  }

  save() {
    if (!this.userId) return;

    this.loading.set(true);
    this.userService.updateUser(this.userId, this.editData()).subscribe({
      next: () => {
        this.onSave.emit();
        this.close();
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Erro ao atualizar:', err);
        this.loading.set(false);
      }
    });
  }
}
