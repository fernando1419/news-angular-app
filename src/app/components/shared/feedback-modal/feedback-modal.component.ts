import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
   selector: 'app-feedback-modal',
   standalone: true,
   imports: [CommonModule],
   templateUrl: './feedback-modal.component.html',
   styleUrl: './feedback-modal.component.css',
})
export class FeedbackModalComponent {
   @ViewChild('dialogRef', { static: true }) dialogRef!: ElementRef<HTMLDialogElement>;

   message = '';
   title = '';
   boxClass = '';
   iconSvg = '';

   show(type: 'success' | 'error' | 'warning', message: string) {
      this.message = message;

      switch (type) {
         case 'success':
            this.title = 'Success!';
            this.boxClass = 'bg-green-500';
            this.iconSvg = `<svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>`;
            break;
         case 'error':
            this.title = 'Error!';
            this.boxClass = 'bg-red-500';
            this.iconSvg = `<svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>`;
            break;
         case 'warning':
            this.title = 'Warning!';
            this.boxClass = 'bg-yellow-500 text-black';
            this.iconSvg = `<svg class="w-12 h-12 text-black" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01M4.93 19h14.14a1 1 0 00.87-1.5L13.37 4.5a1 1 0 00-1.74 0L4.06 17.5a1 1 0 00.87 1.5z" /></svg>`;
            break;
      }

      this.dialogRef.nativeElement.showModal();
   }

   close() {
      this.dialogRef.nativeElement.close();
   }
}
