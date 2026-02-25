import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { AuthService } from './services/auth.service';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, ToastModule],
  templateUrl: './app.html'
})
export class App {
  public authService = inject(AuthService);
  isDarkMode = signal(false);

  toggleDarkMode() {
    this.isDarkMode.update(val => !val);
  }

  setDarkMode(value: boolean) {
    this.isDarkMode.set(value);
  }
}
