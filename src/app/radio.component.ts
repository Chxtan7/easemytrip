import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-radio',
  standalone: true,
  template: `
    <div class="form-check">
      <input class="form-check-input" type="radio" [id]="id" [name]="name" [checked]="checked" (change)="checked = true">
      <label class="form-check-label" [for]="id">
        <ng-content></ng-content>
      </label>
    </div>
  `
})
export class RadioComponent {
  @Input() id = '';
  @Input() name = '';
  @Input() checked = false;
}
