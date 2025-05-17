import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  standalone: true,
  template: `
    <div class="container py-5 text-center">
      <h1 class="display-4 fw-bold mb-3">404</h1>
      <p class="lead mb-4">Sorry, the page you are looking for does not exist.</p>
      <a routerLink="/" class="btn btn-primary">Go Home</a>
    </div>
  `
})
export class NotFoundComponent {}
