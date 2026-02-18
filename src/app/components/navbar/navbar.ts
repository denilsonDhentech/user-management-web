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
  templateUrl: './navbar.html', // Referência sem o .component
  styleUrl: './navbar.scss'     // Referência sem o .component
})
export class Navbar { // Nome da classe simplificado para seguir seu padrão
  public app = inject(App);

  items: MenuItem[] = [
    {
      label: 'Usuários',
      icon: 'pi pi-users',
      routerLink: '/users'
    }
  ];

  // Resolve o problema de tipagem do PrimeNG para o Dark Mode
  buttonSeverity = computed(() =>
    this.app.isDarkMode() ? 'warning' : 'secondary'
  );

  toggleTheme() {
    this.app.isDarkMode.set(!this.app.isDarkMode());
  }

  logout() {
    localStorage.removeItem('token'); // Limpa o JWT do seu backend Java
    window.location.href = '/login';
  }
}
