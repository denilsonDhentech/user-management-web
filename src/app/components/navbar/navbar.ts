import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { MenuItem } from 'primeng/api';
import { App } from '../../app';
import { AuthService } from '../../services/auth.service';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MenubarModule, ButtonModule, TooltipModule, TagModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  public app = inject(App);
  public authService = inject(AuthService);

  items = computed<MenuItem[]>(() => {
    const menu: MenuItem[] = [
      {
        label: 'Documentos',
        icon: 'pi pi-file',
        routerLink: '/documents'
      }
    ];

    if (this.authService.isAdmin()) {
      menu.push({
        label: 'Usuários',
        icon: 'pi pi-users',
        routerLink: '/users'
      });
    }

    return menu;
  });

  buttonSeverity = computed(() =>
    this.app.isDarkMode() ? 'warning' : 'secondary'
  );

  toggleTheme() {
    this.app.setDarkMode(!this.app.isDarkMode());
  }

  logout() {
    this.authService.logout();
  }
}
