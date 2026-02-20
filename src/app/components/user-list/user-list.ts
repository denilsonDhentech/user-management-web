import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/UserService';
import { UserResponse } from '../../models/user.model';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { UserEditDialog } from '../user-edit-dialog/user-edit-dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, TagModule, MenuModule, UserEditDialog],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss'
})
export class UserList implements OnInit {
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private router = inject(Router);

  selectedUser = signal<UserResponse | null>(null);

  menuItems = signal<MenuItem[]>([]);

  users = signal<UserResponse[]>([]);
  loading = signal(true);
  error = signal('');

  isEditDialogVisible = signal(false);

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.listUsers().subscribe({
      next: (response) => {
        this.users.set(response.content);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Erro ao carregar usuários. Verifique se o token é válido.');
        this.loading.set(false);
        console.error(err);
      }
    });
  }

  onActionClick(event: Event, menu: any, user: UserResponse) {
      this.selectedUser.set(user);
      this.setupMenu(user);
      menu.toggle(event);
  }

  setupMenu(user: UserResponse) {
    const isOwnAccount = user.email === this.authService.getUserEmail();

    const actions: MenuItem[] = [
      {
        label: 'Editar',
        icon: 'pi pi-pencil',
        disabled: !isOwnAccount && !this.authService.isAdmin(),
        command: () => this.onEdit(user)
      }
    ];

    if (this.authService.isAdmin() && !isOwnAccount) {
      actions.push({
        label: 'Excluir',
        icon: 'pi pi-trash',
        styleClass: 'text-danger',
        command: () => this.onDelete(user)
      });
    }

    this.menuItems.set([{ label: 'Ações', items: actions }]);
  }

  onEdit(user: UserResponse | null) {
    if (user) {
      this.selectedUser.set(user);
      this.isEditDialogVisible.set(true);
    }
  }

  onDelete(user: UserResponse | null) {
    if (user) console.log('Excluindo:', user.id);
  }

  handleSaveSuccess() {
    this.loadUsers();
  }

  goToCreateUser() {
    this.router.navigate(['/users/new']);
  }
}
