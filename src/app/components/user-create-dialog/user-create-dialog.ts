import { Component, EventEmitter, Input, Output, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { PasswordModule } from 'primeng/password';
import { UserUpdateRequest } from '../../models/accounts/user.model';
import { UserService } from '../../services/account/UserService';

@Component({
  selector: 'app-user-create-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    SelectButtonModule
  ],
  templateUrl: './user-create-dialog.html',
  styleUrl: './user-create-dialog.scss'
})
export class UserCreateDialog {
  private userService = inject(UserService);

  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() onSave = new EventEmitter<void>();

  formData = signal({
    name: '',
    username: '',
    password: '',
    role: 'USER',
    tenantId: ''
  });

  isUsernameValid = computed(() => {
    const u = this.formData().username;
    return u.length >= 3 && u.length <= 50;
  });

  isPasswordValid = computed(() => this.formData().password.length >= 6);

  isTenantValid = computed(() => this.formData().tenantId.length >= 1);

  isFormValid = computed(() =>
    this.isUsernameValid() && this.isPasswordValid() && this.isTenantValid()
  );

  loading = signal(false);

  roles = [
    { label: 'Viewer', value: 'VIEWER' },
    { label: 'User', value: 'USER' },
    { label: 'Admin', value: 'ADMIN' }
  ];

  close() {
    this.resetForm();
    this.visibleChange.emit(false);
  }

  resetForm() {
    this.formData.set({ name: '', username: '', password: '', role: 'USER', tenantId: 'T1' });
  }

  save() {

  }
}
