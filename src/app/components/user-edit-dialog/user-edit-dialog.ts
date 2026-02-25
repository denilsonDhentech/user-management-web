import { Component, EventEmitter, Input, Output, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { UserService } from '../../services/account/UserService';
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

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() onSave = new EventEmitter<void>();

  private userId: string = '';


  loading = signal(false);

  close() {
    this.visibleChange.emit(false);
  }

}
