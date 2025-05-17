import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-badge',
  standalone: true,
  template: `<span class="badge bg-{{color}}"><ng-content></ng-content></span>`
})
export class BadgeComponent {
  @Input() color: string = 'primary';
}
