import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/UserService';
import { UserResponse } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss'
})
export class UserList implements OnInit {
  private userService = inject(UserService);

  // Signal para armazenar a lista de usuários
  users = signal<UserResponse[]>([]);
  loading = signal(true);
  error = signal('');

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.checkBackend().subscribe({
      next: (response) => {
        // Lembre-se que o Spring Data devolve os dados dentro de 'content'
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
