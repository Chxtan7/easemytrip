import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="alert alert-{{type || 'info'}} d-flex align-items-center" role="alert">
      <div>
        <strong *ngIf="title">{{ title }}</strong>
        <span *ngIf="description"> {{ description }}</span>
      </div>
    </div>
  `,
  styles: [``]
})
export class AlertComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() type: 'success' | 'danger' | 'warning' | 'info' = 'info';
}
