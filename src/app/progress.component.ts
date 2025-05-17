import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress',
  standalone: true,
  template: `
    <div class="progress">
      <div class="progress-bar bg-{{color}}" role="progressbar" [style.width.%]="value" [attr.aria-valuenow]="value" aria-valuemin="0" aria-valuemax="100">{{ value }}%</div>
    </div>
  `
})
export class ProgressComponent {
  @Input() value = 0;
  @Input() color: string = 'primary';
}
