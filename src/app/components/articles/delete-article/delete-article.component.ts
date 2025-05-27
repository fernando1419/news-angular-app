import { AfterViewInit, Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, Subscription } from 'rxjs';
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
export class DeleteArticleComponent implements OnInit, AfterViewInit, OnDestroy {
   @ViewChild('modal') modalRef!: ElementRef<HTMLDialogElement>;
   private dataSubscription: Subscription | undefined;
   protected articleId: string | null = null;
   protected article: Article | null = null;

   private readonly router = inject(Router);
   private readonly route = inject(ActivatedRoute);
   private readonly articleApiService = inject(ArticleApiService);
   private readonly modalFeedbackService = inject(ModalFeedbackService);

   ngOnInit(): void {
      this.articleId = this.route.snapshot.paramMap.get('id');
      if (this.articleId) {
         this.getArticle(Number(this.articleId));
      }
   }

   ngAfterViewInit(): void {
      this.displayModal();
   }

   private async getArticle(articleId: number): Promise<void> {
      try {
         this.article = await firstValueFrom(this.articleApiService.getArticleById(articleId));
         if (!this.article) {
            this.router.navigate(['/articles']);
         }
         this.displayModal();
      } catch (error) {
         console.error('Error when fetching an article:', error);
      }
   }

   private displayModal() {
      this.modalRef.nativeElement.showModal();
      setTimeout(() => this.modalRef.nativeElement.focus(), 0);
   }

   onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
         event.stopPropagation();
         event.preventDefault();
      }
   }

   onSubmit() {
      if (this.articleId) {
         this.dataSubscription = this.articleApiService.deleteArticle(this.articleId).subscribe({
            next: () => {
               console.log('article deleted!');
               this.modalFeedbackService.show('Article was successfully deleted!', 'warning');
               this.router.navigate(['articles']);
            },
            error: (error) => console.error('Error deleting article:', error),
         });
      }
   }

   ngOnDestroy(): void {
      this.dataSubscription?.unsubscribe();
   };

   onClose() {
      this.router.navigate(['articles', this.articleId]);
   }
}
