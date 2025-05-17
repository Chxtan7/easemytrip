import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-switch',
  standalone: true,
  template: `
    <div class="form-check form-switch">
      <input class="form-check-input" type="checkbox" [id]="id" [checked]="checked" (change)="checked = !checked">
      <label class="form-check-label" [for]="id">
        <ng-content></ng-content>
      </label>
    </div>
  `
})
export class SwitchComponent {
  @Input() id = '';
  @Input() checked = false;
}
