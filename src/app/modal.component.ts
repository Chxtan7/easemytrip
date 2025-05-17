import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  template: `
    <div class="modal fade show d-block" tabindex="-1" role="dialog" *ngIf="open" style="background:rgba(0,0,0,0.5);">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button type="button" class="btn-close" aria-label="Close" (click)="close()"></button>
          </div>
          <div class="modal-body">
            <ng-content></ng-content>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" (click)="close()">Close</button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ModalComponent {
  @Input() open = false;
  @Input() title = '';
  close() {
    this.open = false;
  }
}
