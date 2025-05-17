import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-select',
  standalone: true,
  template: `
    <select class="form-select" [value]="value" (change)="onChange($event)">
      <option *ngFor="let option of options" [value]="option.value">{{ option.label }}</option>
    </select>
  `
})
export class SelectComponent {
  @Input() options: { label: string, value: string }[] = [];
  @Input() value: string = '';
  onChange(event: Event) {
    this.value = (event.target as HTMLSelectElement).value;
  }
}
