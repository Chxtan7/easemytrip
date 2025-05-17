import { Component, OnDestroy } from '@angular/core';
import { ToastService, Toast } from './toast.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 1200;">
      <div *ngFor="let toast of toasts" class="toast show align-items-center text-bg-{{toast.type || 'info'}} border-0 mb-2" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body">
            <strong>{{ toast.title }}</strong>
            <div *ngIf="toast.description" class="small">{{ toast.description }}</div>
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" aria-label="Close" (click)="remove(toast.id)"></button>
        </div>
      </div>
    </div>
  `,
  styles: [``]
})
export class ToasterComponent implements OnDestroy {
  toasts: Toast[] = [];
  private sub: Subscription;

  constructor(private toastService: ToastService) {
    this.sub = this.toastService.toasts$.subscribe(toasts => this.toasts = toasts);
  }

  remove(id: number) {
    this.toastService.removeToast(id);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
