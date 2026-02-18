import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule], // Necessário para usar o ngModel no HTML
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  // Signals para os campos do formulário
  email = signal('');
  password = signal('');
  errorMessage = signal('');

  handleLogin() {
    this.authService.login({
      email: this.email(),
      password: this.password()
    }).subscribe({
      next: (response) => {
        console.log('Token recebido:', response.token);
        this.router.navigate(['/users']); // Navega após o sucesso
      },
      error: (err) => {
        this.errorMessage.set('E-mail ou senha incorretos.');
      }
    });
  }
}
