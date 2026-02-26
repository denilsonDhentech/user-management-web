import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/account/UserService';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

import { MenuModule } from 'primeng/menu';
import { MenuItem, MessageService, ConfirmationService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { UserResponse } from '../../models/accounts/user.model';
import { UserEditDialog } from '../user-edit-dialog/user-edit-dialog';

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
  private messageService = inject(MessageService);

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
        this.users.set(response);
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
    const isOwnAccount = user.username === this.authService.userName();
    const isAdmin = this.authService.isAdmin();

    const actions: MenuItem[] = [
      {
        label: 'Editar',
        icon: 'pi pi-pencil',
        disabled: !isOwnAccount && !isAdmin,
        command: () => this.onEdit(user)
      }
    ];

    if (isAdmin && !isOwnAccount) {
      actions.push({
        label: 'Excluir',
        icon: 'pi pi-trash',
        styleClass: 'text-danger',
        command: () => this.onDelete(user)
      });
    }

    this.menuItems.set(actions);
  }

  onEdit(user: UserResponse | null) {
    if (user) {
      this.selectedUser.set(user);
      this.isEditDialogVisible.set(true);
    }
  }


  handleSaveSuccess() {
    this.loadUsers();
  }

  handleSave(updatedData: any): void {
    const userId = this.selectedUser()?.id;

    if (!userId) return;

    this.userService.updateUser(userId, updatedData).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Usuário atualizado com sucesso!'
        });
        this.isEditDialogVisible.set(false);
        this.loadUsers();
      },
      error: (err) => {
        console.error(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível atualizar o usuário.'
        });
      }
    });
  }

  onDelete(user: UserResponse | null): void {
    if (!user || !user.id) return;

    if (confirm(`Deseja realmente excluir o usuário ${user.username}?`)) {
      this.userService.deleteUser(user.id).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Excluído',
            detail: 'Usuário removido com sucesso.'
          });
          this.loadUsers();
        },
        error: (err) => {
          console.error(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao tentar excluir usuário.'
          });
        }
      });
    }
  }
}
