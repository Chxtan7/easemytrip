import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-group',
  standalone: true,
  template: `
    <ul class="list-group">
      <li class="list-group-item" *ngFor="let item of items">
        <ng-container *ngIf="item.link; else plain"> <a [routerLink]="item.link">{{ item.label }}</a> </ng-container>
        <ng-template #plain>{{ item.label }}</ng-template>
      </li>
    </ul>
  `
})
export class ListGroupComponent {
  @Input() items: { label: string, link?: string }[] = [];
}
