import { AfterViewInit, Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, Subscription } from 'rxjs';
import { ArticleFormComponent } from 'src/app/components/articles/article-form/article-form.component';
import { Article } from 'src/app/models/article.interface';
import { ArticleApiService } from 'src/app/services/article-api.service';

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
   protected articleId: string | null = null;

   private readonly router = inject(Router);
   private readonly route = inject(ActivatedRoute);
   private readonly articleApiService = inject(ArticleApiService);

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

   onSave(payload: Article): void {
      this.dataSubscription = this.articleApiService.updateArticle(payload.id, payload).subscribe({
         next: () => {
            console.log('article updated!');
            this.onClose();
            // TODO: show a message that article was successfully updated and redirect.
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
      this.router.navigate(['articles', this.articleId]);
   }
}
