import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-accordion',
  standalone: true,
  template: `
    <div class="accordion" id="accordionExample">
      <div class="accordion-item" *ngFor="let item of items; let i = index">
        <h2 class="accordion-header" [id]="'heading' + i">
          <button class="accordion-button" type="button" [attr.data-bs-toggle]="'collapse'" [attr.data-bs-target]="'#collapse' + i" [attr.aria-expanded]="i === 0 ? 'true' : 'false'" [attr.aria-controls]="'collapse' + i">
            {{ item.title }}
          </button>
        </h2>
        <div [id]="'collapse' + i" class="accordion-collapse collapse" [class.show]="i === 0" [attr.aria-labelledby]="'heading' + i" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            {{ item.content }}
          </div>
        </div>
      </div>
    </div>
  `
})
export class AccordionComponent {
  @Input() items: { title: string, content: string }[] = [];
}
