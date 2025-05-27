import { AfterViewInit, Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArticleApiService } from 'src/app/services/article-api.service';

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

   private readonly router = inject(Router);
   private readonly route = inject(ActivatedRoute);
   private readonly articleApiService = inject(ArticleApiService);

   ngOnInit(): void {
      this.articleId = this.route.snapshot.paramMap.get('id');
   }

   ngAfterViewInit(): void {
      this.displayModal();
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
               this.router.navigate(['articles']);
               // TODO: show a message that article was successfully deleted and redirect.
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
