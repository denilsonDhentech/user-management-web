import { Component, EventEmitter, Input, Output, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'app-user-edit-dialog',
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
  templateUrl: './user-edit-dialog.html',
  styleUrl: './user-edit-dialog.scss'
})
export class UserEditDialog {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() onSave = new EventEmitter<any>();

  @Input() set user(userData: any) {
    if (userData) {
      this.formData.set({
        username: userData.username || '',
        password: '',
        role: userData.role || 'USER',
        tenantId: userData.tenantId || ''
      });
    }
  }

  roles = [
    { label: 'ADMIN', value: 'ADMIN' },
    { label: 'USER', value: 'USER' },
    { label: 'VIEWER', value: 'VIEWER' }
  ];

  loading = signal(false);


  formData = signal({
    username: '',
    password: '',
    role: 'USER',
    tenantId: ''
  });


  isUsernameValid() {
    const username = this.formData().username;
    return username.length >= 3 && username.length <= 50;
  }

  isPasswordValid() {
    const password = this.formData().password;

    return password.length === 0 || password.length >= 6;
  }

  isFormValid() {
    return this.isUsernameValid() &&
           this.isPasswordValid() &&
           this.formData().tenantId.length > 0;
  }

  save() {
    if (this.isFormValid()) {
      this.loading.set(true);

      this.onSave.emit(this.formData());
    }
  }

  close() {
    this.visibleChange.emit(false);
    this.loading.set(false);
  }
}
