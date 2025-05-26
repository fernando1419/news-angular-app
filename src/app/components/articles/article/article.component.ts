import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models/article.interface';
import { ArticleApiService } from 'src/app/services/article-api.service';

@Component({
   selector: 'app-article',
   standalone: true,
   imports: [RouterOutlet],
   templateUrl: './article.component.html',
   styleUrl: './article.component.css',
})
export class ArticleComponent implements OnInit, OnDestroy {
   private dataSubscription: Subscription | undefined;
   protected article?: Article;
   private readonly articleService = inject(ArticleApiService);

   ngOnInit(): void {
      this.fetchArticle();
   }

   fetchArticle(): void {
      this.dataSubscription = this.articleService.getArticleById(1).subscribe({
         next: (article) => this.article = article ?? 'Undefined article!',
         error: (error) => console.error('Error fetching article:', error),
      });
   }

   ngOnDestroy(): void {
      this.dataSubscription?.unsubscribe();
   }
}
