import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TrimValueDirective } from 'src/app/directives/trim-value.directive';
import { Article } from 'src/app/models/article.interface';

@Component({
   selector: 'app-article-form',
   standalone: true,
   imports: [ReactiveFormsModule, TrimValueDirective],
   templateUrl: './article-form.component.html',
   styleUrl: './article-form.component.css',
})
export class ArticleFormComponent implements OnInit {
   private fb = inject(FormBuilder);
   form!: FormGroup;

   @Input() article: Article | null = null;
   @Output() formClosed = new EventEmitter<void>();
   @Output() savePayload = new EventEmitter<Article>();

   get f() {
      return this.form.controls;
   }

   ngOnInit(): void {
      this.form = this.fb.group({
         imageUrl: [this.article?.imageUrl || '', [Validators.pattern('https?://.+')]],
         author: [this.article?.author || '', Validators.required],
         title: [this.article?.title || '', [Validators.required, Validators.minLength(5)]],
         subtitle: [this.article?.subtitle || '', [Validators.required, Validators.minLength(5)]],
         description: [this.article?.description || '', [Validators.required, Validators.minLength(100)]],
      });
   }

   onClose() {
      this.formClosed.emit();
   }

   onSubmit() {
      if (this.form.invalid) {
         this.form.markAllAsTouched();
         return;
      }

      const formData: Article = this.form.value;
      const now = `${new Date().toISOString().split('.')[0]}Z`; // without milliseconds.

      if (this.article) {
         this.savePayload.emit({ ...this.article, ...formData, createdAt: now, updatedAt: now });
      } else {
         this.savePayload.emit({ ...formData, id: Date.now(), createdAt: now, updatedAt: now });
      }
   }
}
