import { AfterViewInit, Component, ElementRef, EventEmitter, inject, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ArticleFormComponent } from 'src/app/components/articles/article-form/article-form.component';
import { Article } from 'src/app/models/article.interface';
import { ArticleApiService } from 'src/app/services/article-api.service';
import { ModalFeedbackService } from 'src/app/services/modal-feedback.service';

@Component({
   selector: 'app-edit-article',
   standalone: true,
   imports: [ArticleFormComponent],
   templateUrl: './edit-article.component.html',
   styleUrl: './edit-article.component.css',
})
export class EditArticleComponent implements OnChanges, AfterViewInit, OnDestroy, OnChanges {
   @ViewChild('modal') modalRef!: ElementRef<HTMLDialogElement>;

   @Input() article: Article | null = null;
   @Output() close = new EventEmitter<void>();
   @Output() articleUpdated = new EventEmitter<Article>();

   private dataSubscription: Subscription | undefined;

   private readonly articleApiService = inject(ArticleApiService);
   private readonly modalFeedbackService = inject(ModalFeedbackService);

   ngOnChanges(changes: SimpleChanges): void {
      if (changes['article']?.currentValue) {
         this.article = changes['article'].currentValue;
      }
   }

   ngAfterViewInit(): void {
      this.modalRef.nativeElement.showModal();
      setTimeout(() => this.modalRef.nativeElement.focus(), 100);
   }

   onSave(payload: Article): void {
      if (!payload) { return; }

      this.dataSubscription = this.articleApiService.updateArticle(payload.id, payload).subscribe({
         next: (updatedArticle) => {
            this.modalFeedbackService.show('Article was successfully updated!', 'success');
            this.articleUpdated.emit(updatedArticle);
            this.onClose();
         },
         error: (error) => {
            console.error('Error updating article:', error);
            this.modalFeedbackService.show('Error updating article...', 'error');
         },
      });
   }

   onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
         event.stopPropagation();
         event.preventDefault();
      }
   }
   ngOnDestroy(): void {
      this.dataSubscription?.unsubscribe();
   }

   onClose() {
      this.modalRef.nativeElement.close();
      this.close.emit();
   }
}
