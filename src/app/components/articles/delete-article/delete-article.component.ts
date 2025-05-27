import { AfterViewInit, Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
export class DeleteArticleComponent implements OnInit, AfterViewInit, OnDestroy {
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

   onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
         event.stopPropagation();
         event.preventDefault();
      }
   }

   onSubmit() {
      if (this.article) {
         this.dataSubscription = this.articleApiService.deleteArticle(this.article.id).subscribe({
            next: () => {
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
      this.router.navigate(['articles']);
   }
}
