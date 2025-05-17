import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tabs',
  standalone: true,
  template: `
    <ul class="nav nav-tabs mb-3">
      <li class="nav-item" *ngFor="let tab of tabs; let i = index">
        <button class="nav-link" [class.active]="i === activeIndex" (click)="selectTab(i)">{{ tab.label }}</button>
      </li>
    </ul>
    <div class="tab-content">
      <div class="tab-pane fade show active">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class TabsComponent {
  @Input() tabs: { label: string }[] = [];
  @Input() activeIndex = 0;
  selectTab(i: number) {
    this.activeIndex = i;
  }
}
