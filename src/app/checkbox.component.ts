import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  template: `
    <div class="form-check">
      <input class="form-check-input" type="checkbox" [id]="id" [checked]="checked" (change)="checked = !checked">
      <label class="form-check-label" [for]="id">
        <ng-content></ng-content>
      </label>
    </div>
  `
})
export class CheckboxComponent {
  @Input() id = '';
  @Input() checked = false;
}
