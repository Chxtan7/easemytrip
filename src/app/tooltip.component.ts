import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  template: `<span [attr.title]="text"><ng-content></ng-content></span>`
})
export class TooltipComponent {
  @Input() text = '';
}
