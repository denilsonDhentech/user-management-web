import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/UserService';
import { UserResponse } from '../../models/user.model';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, TagModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss'
})
export class UserList implements OnInit {
  private userService = inject(UserService);

  users = signal<UserResponse[]>([]);
  loading = signal(true);
  error = signal('');

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
}
