import { Injectable } from '@angular/core';
import { FeedbackModalComponent } from 'src/app/components/shared/feedback-modal/feedback-modal.component';

@Injectable({ providedIn: 'root' })
export class ModalFeedbackService {
   private modal?: FeedbackModalComponent;

   register(modal: FeedbackModalComponent) {
      this.modal = modal;
   }

   show(message: string, type: 'success' | 'error' | 'warning') {
      this.modal?.show(type, message);
   }
}
