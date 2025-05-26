import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ArticleAsideComponent } from 'src/app/components/articles/article-aside/article-aside.component';
import { Article } from 'src/app/models/article.interface';
import { ArticleApiService } from 'src/app/services/article-api.service';

@Component({
   selector: 'app-sidebar',
   standalone: true,
   imports: [ArticleAsideComponent],
   templateUrl: './sidebar.component.html',
   styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit, OnDestroy {
   protected sidebarArticles: Article[] = [];

   private dataSubscription: Subscription | undefined;

   private readonly articleService = inject(ArticleApiService);

   @Input() articlesCount?: number;

   ngOnInit(): void {
      this.fetchSidebarArticles();
   }

   fetchSidebarArticles(): void {
      this.dataSubscription = this.articleService.getAllArticles().subscribe({
         next: (articles) => this.sidebarArticles = this.articlesCount ? articles.slice(0, this.articlesCount) : articles,
         error: (error) => console.error('Error fetching articles:', error),
      });
   }

   ngOnDestroy(): void {
      this.dataSubscription?.unsubscribe();
   }
}
