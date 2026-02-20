import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-user-create',
  imports: [CardModule, ButtonModule],
  templateUrl: './user-create.html',
  styleUrl: './user-create.scss',
})
export class UserCreate {
  private router = inject(Router);

  goBack() {
    this.router.navigate(['/users']);
  }
}
