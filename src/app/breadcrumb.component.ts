import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  template: `
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li *ngFor="let crumb of crumbs; let last = last" class="breadcrumb-item" [class.active]="last" [attr.aria-current]="last ? 'page' : null">
          <ng-container *ngIf="!last"><a [routerLink]="crumb.link">{{ crumb.label }}</a></ng-container>
          <ng-container *ngIf="last">{{ crumb.label }}</ng-container>
        </li>
      </ol>
    </nav>
  `
})
export class BreadcrumbComponent {
  @Input() crumbs: { label: string, link?: string }[] = [];
}
