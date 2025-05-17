import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  template: `
    <nav *ngIf="pages > 1">
      <ul class="pagination justify-content-center">
        <li class="page-item" [class.disabled]="current === 1">
          <a class="page-link" href="#" (click)="select(current - 1, $event)">Previous</a>
        </li>
        <li class="page-item" *ngFor="let p of [].constructor(pages); let i = index" [class.active]="i + 1 === current">
          <a class="page-link" href="#" (click)="select(i + 1, $event)">{{ i + 1 }}</a>
        </li>
        <li class="page-item" [class.disabled]="current === pages">
          <a class="page-link" href="#" (click)="select(current + 1, $event)">Next</a>
        </li>
      </ul>
    </nav>
  `
})
export class PaginationComponent {
  @Input() pages = 1;
  @Input() current = 1;
  select(page: number, event: Event) {
    event.preventDefault();
    if (page >= 1 && page <= this.pages) {
      this.current = page;
    }
  }
}
