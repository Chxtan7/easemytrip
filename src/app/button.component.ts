import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  template: `<button [type]="type" class="btn btn-{{variant}}" [disabled]="disabled"><ng-content></ng-content></button>`
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' = 'button';
  @Input() variant: 'primary' | 'secondary' | 'danger' | 'success' = 'primary';
  @Input() disabled = false;
}
