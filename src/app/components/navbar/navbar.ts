import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { MenuItem } from 'primeng/api';
import { App } from '../../app';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MenubarModule, ButtonModule, TooltipModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'     
})
export class Navbar {
  public app = inject(App);

  items: MenuItem[] = [
    {
      label: 'Usuários',
      icon: 'pi pi-users',
      routerLink: '/users'
    }
  ];

  buttonSeverity = computed(() =>
    this.app.isDarkMode() ? 'warning' : 'secondary'
  );

  toggleTheme() {
    this.app.isDarkMode.set(!this.app.isDarkMode());
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
}
