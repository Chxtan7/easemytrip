import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
  id: number;
  title: string;
  description?: string;
  type?: 'success' | 'error' | 'info' | 'warning';
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  toasts$ = this.toastsSubject.asObservable();
  private idCounter = 0;

  showToast(toast: Omit<Toast, 'id'>) {
    const id = ++this.idCounter;
    const newToast: Toast = { id, ...toast };
    this.toastsSubject.next([...this.toastsSubject.value, newToast]);
    setTimeout(() => this.removeToast(id), 4000);
  }

  removeToast(id: number) {
    this.toastsSubject.next(this.toastsSubject.value.filter(t => t.id !== id));
  }
}
