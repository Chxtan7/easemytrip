import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  template: `<input [type]="type" class="form-control" [placeholder]="placeholder" [value]="value" (input)="onInput($event)">`
})
export class InputComponent {
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() value: string = '';
  onInput(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
  }
}
