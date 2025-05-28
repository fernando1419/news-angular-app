import { Directive, HostListener, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
   selector: '[trimValue]',
   standalone: true,
})
export class TrimValueDirective {
   private control = inject(NgControl);

   @HostListener('blur')
   onBlur() {
      const value = this.control.control?.value;

      if (typeof value === 'string') {
         const trimmed = value.trim();
         if (value !== trimmed) {
            this.control.control?.setValue(trimmed, { emitEvent: false });
         }
      }
   }
}
