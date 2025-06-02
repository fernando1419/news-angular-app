import { AfterViewInit, Component, ElementRef, EventEmitter, inject, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models/article.interface';
import { ArticleApiService } from 'src/app/services/article-api.service';
import { ModalFeedbackService } from 'src/app/services/modal-feedback.service';

@Component({
   selector: 'app-delete-article',
   standalone: true,
   imports: [],
   templateUrl: './delete-article.component.html',
   styleUrl: './delete-article.component.css',
})
export class DeleteArticleComponent implements AfterViewInit, OnDestroy, OnChanges {
   @ViewChild('modal') modalRef!: ElementRef<HTMLDialogElement>;
   private dataSubscription: Subscription | undefined;
   @Input() article: Article | null = null;
   @Output() close = new EventEmitter<void>();
   @Output() articleDeleted = new EventEmitter<void>();

   private readonly router = inject(Router);
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

   onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
         event.stopPropagation();
         event.preventDefault();
      }
   }

   onSubmit() {
      if (!this.article) { return; }

      this.dataSubscription = this.articleApiService.deleteArticle(this.article.id).subscribe({
         next: () => {
            this.articleDeleted.emit();
         },
         error: (error) => {
            console.error('Error deleting article:', error);
            this.modalFeedbackService.show('Error deleting article...', 'error');
         },
      });
   }

   ngOnDestroy(): void {
      this.dataSubscription?.unsubscribe();
   };

   onClose() {
      this.modalRef.nativeElement.close();
      this.close.emit();
   }
}
