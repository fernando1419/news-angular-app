import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ArticleCarouselComponent } from 'src/app/components/articles/article-carousel/article-carousel.component';
import { ShowArticleComponent } from 'src/app/components/articles/show-article/show-article.component';
import { Article } from 'src/app/models/article.interface';
import { ArticleApiService } from 'src/app/services/article-api.service';

@Component({
   selector: 'app-home',
   standalone: true,
   imports: [ShowArticleComponent, ArticleCarouselComponent],
   templateUrl: './home.component.html',
   styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
   latestArticles: Article[] = [];
   latestArticle: Article | null = null;
   carouselArticles: Article[] = [];
   private dataSubscription: Subscription | undefined;
   private readonly articleService = inject(ArticleApiService);

   ngOnInit(): void {
      this.fetchFeaturedArticles();
   }

   fetchFeaturedArticles(): void {
      this.dataSubscription = this.articleService.getLatestArticles(15).subscribe({
         next: (articles) => {
            this.latestArticles = articles;
            this.latestArticle = this.latestArticles[0];
            this.carouselArticles = this.latestArticles.slice(1, this.latestArticles.length);
         },
         error: (error) => console.error('Error fetching latest articles:', error),
      });
   }

   ngOnDestroy(): void {
      this.dataSubscription?.unsubscribe();
   }
}
