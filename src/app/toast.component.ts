import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  template: `
    <div class="toast show align-items-center text-bg-{{type || 'info'}} border-0 mb-2" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">
          <strong>{{ title }}</strong>
          <div *ngIf="description" class="small">{{ description }}</div>
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" aria-label="Close" (click)="close()"></button>
      </div>
    </div>
  `
})
export class ToastComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() type: 'success' | 'danger' | 'warning' | 'info' = 'info';
  close() {}
}
