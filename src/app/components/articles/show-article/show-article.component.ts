import { Component, inject, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { DeleteArticleComponent } from 'src/app/components/articles/delete-article/delete-article.component';
import { EditArticleComponent } from 'src/app/components/articles/edit-article/edit-article.component';
import { Article } from 'src/app/models/article.interface';
import { ArticleApiService } from 'src/app/services/article-api.service';

@Component({
   selector: 'app-article',
   standalone: true,
   imports: [RouterLink, EditArticleComponent, DeleteArticleComponent],
   templateUrl: './show-article.component.html',
   styleUrl: './show-article.component.css',
})
export class ShowArticleComponent implements OnDestroy, OnInit {
   private dataSubscriptions: Subscription[] | undefined = [];
   private readonly route = inject(ActivatedRoute);
   private readonly router = inject(Router);
   private readonly articleApiService = inject(ArticleApiService);

   @Input() article: Article | null = null;
   protected action = signal<'edit' | 'delete' | null>(null);

   ngOnInit(): void {
      this.dataSubscriptions?.push(this.route.data.subscribe(data => {
         this.article = structuredClone(data['article']); // changes reference to update ngOnChanges on children (deep copy).
      }));

      this.dataSubscriptions?.push(this.route.queryParamMap.subscribe((params) => {
         const value = params.get('action');
         if (value === 'edit' || value === 'delete') {
            this.action.set(value);
         } else {
            this.action.set(null);
         }
      }));
   }

   onArticleUpdated(updatedArticle: Article): void {
      this.articleApiService.getArticleById(updatedArticle.id).subscribe({
         next: latest => this.article = { ...latest }, // changes reference to update ngOnChanges on children (shallow copy).
         error: () => this.router.navigate(['/']),
      });
   }

   onArticleDeleted(): void {
      localStorage.setItem('deletionMessage', JSON.stringify({ message: 'Article was successfully deleted!', type: 'warning' }));
      setTimeout(() => this.router.navigate(['/']), 100);
   }

   ngOnDestroy(): void {
      this.dataSubscriptions?.forEach(subscription => subscription.unsubscribe());
   }

   closeModal(): void {
      this.router.navigate([], {
         relativeTo: this.route,
         queryParams: { action: null },
         queryParamsHandling: 'merge',
      });
   }
}
