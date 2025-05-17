import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  template: `
    <div class="d-flex justify-content-center align-items-center" [style.height.px]="size">
      <div class="spinner-border text-{{color}}" [style.width.px]="size" [style.height.px]="size" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `
})
export class SpinnerComponent {
  @Input() color: string = 'primary';
  @Input() size: number = 32;
}
