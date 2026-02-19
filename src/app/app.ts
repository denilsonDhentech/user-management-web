import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { AuthService } from './services/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar],
  template: `
    <div [class.my-app-dark]="isDarkMode()" class="min-h-screen">

      @if (auth.isAuthenticated()) {
        <app-navbar />
      }

      <main>
        <router-outlet />
      </main>
    </div>
  `
})
export class App {
  isDarkMode = signal(false);
  public auth = inject(AuthService); // Injetamos o serviço para ler o Signal
}
