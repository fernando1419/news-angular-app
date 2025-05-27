import { AfterViewInit, Component, ElementRef, inject, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArticleFormComponent } from 'src/app/components/articles/article-form/article-form.component';
import { Article } from 'src/app/models/article.interface';
import { ArticleApiService } from 'src/app/services/article-api.service';

@Component({
   selector: 'app-add-article',
   standalone: true,
   imports: [ArticleFormComponent],
   templateUrl: './add-article.component.html',
   styleUrl: './add-article.component.css',
})
export class AddArticleComponent implements AfterViewInit, OnDestroy {
   @ViewChild('modal') modalRef!: ElementRef<HTMLDialogElement>;

   private dataSubscription: Subscription | undefined;
   protected article: Article | null = null;

   private readonly router = inject(Router);
   private readonly articleApiService = inject(ArticleApiService);

   ngAfterViewInit() {
      this.modalRef.nativeElement.showModal();
      setTimeout(() => this.modalRef.nativeElement.focus(), 0);
   }

   onSave(payload: Article): void {
      this.dataSubscription = this.articleApiService.addArticle({ ...payload, id: Date.now() }).subscribe({
         next: () => {
            console.log('article saved!');
            this.onClose();
            // TODO: show a message that article was successfully created and redirect.
         },
         error: (error) => console.error('Error creating article:', error),
      });
   }

   onClose() {
      this.router.navigate(['/articles']);
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
}
