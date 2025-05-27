import { AfterViewInit, Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
export class EditArticleComponent implements OnInit, AfterViewInit, OnDestroy {
   @ViewChild('modal') modalRef!: ElementRef<HTMLDialogElement>;
   private dataSubscription: Subscription | undefined;
   protected article: Article | null = null;

   private readonly router = inject(Router);
   private readonly route = inject(ActivatedRoute);
   private readonly articleApiService = inject(ArticleApiService);
   private readonly modalFeedbackService = inject(ModalFeedbackService);

   ngOnInit(): void {
      this.dataSubscription = this.route.data.subscribe(data => {
         this.article = data['article'];
      });
   }

   ngAfterViewInit(): void {
      this.modalRef.nativeElement.showModal();
      setTimeout(() => this.modalRef.nativeElement.focus(), 0);
   }

   onSave(payload: Article): void {
      this.dataSubscription = this.articleApiService.updateArticle(payload.id, payload).subscribe({
         next: () => {
            this.modalFeedbackService.show('Article was successfully updated!', 'success');
            this.onClose();
         },
         error: (error) => console.error('Error updating article:', error),
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
      if (this.article) {
         this.router.navigate(['articles', this.article.id]);
      }
   }
}
