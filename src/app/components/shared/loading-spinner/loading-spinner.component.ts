import { Component, inject } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
   selector: 'app-loading-spinner',
   standalone: true,
   imports: [],
   template: `
      @if (loadingService.loading()) {
         <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]">
            <svg class="w-12 h-12 text-blue-600 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
               <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
               <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
         </div>
      }
   `,
})
export class LoadingSpinnerComponent {
   protected readonly loadingService = inject(LoadingService);
}

