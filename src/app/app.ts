import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar],
  template: `
    <div [class.my-app-dark]="isDarkMode()" class="min-h-screen">
      @if (authService.isAuthenticated()) {
        <app-navbar />
      }
      <main>
        <router-outlet />
      </main>
    </div>
  `
})
export class App {
  public authService = inject(AuthService);
  isDarkMode = signal(false);
}
