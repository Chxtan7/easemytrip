import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  standalone: true,
  template: `
    <img [src]="src" [alt]="alt" class="rounded-circle border object-fit-cover" [style.width.px]="size" [style.height.px]="size" />
  `
})
export class AvatarComponent {
  @Input() src = '';
  @Input() alt = '';
  @Input() size = 40;
}
