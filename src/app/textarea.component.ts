import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-textarea',
  standalone: true,
  template: `<textarea class="form-control" [placeholder]="placeholder" [value]="value" (input)="onInput($event)"></textarea>`
})
export class TextareaComponent {
  @Input() placeholder: string = '';
  @Input() value: string = '';
  onInput(event: Event) {
    this.value = (event.target as HTMLTextAreaElement).value;
  }
}
