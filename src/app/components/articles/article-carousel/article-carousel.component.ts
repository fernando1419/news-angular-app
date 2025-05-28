import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Article } from 'src/app/models/article.interface';

@Component({
   selector: 'app-article-carousel',
   standalone: true,
   imports: [RouterLink],
   templateUrl: './article-carousel.component.html',
   styleUrl: './article-carousel.component.css',
})
export class ArticleCarouselComponent {
   @Input() articles: Article[] = [];
   protected currentIndex: number = 0;

   prev() {
      // this.currentIndex = this.currentIndex === 0 ? this.articles.length - 1 : this.currentIndex - 1;
      this.currentIndex = this.currentIndex === 0 ? 6 : this.currentIndex - 1;
   }

   next() {
      // this.currentIndex = this.currentIndex === this.articles.length - 1 ? 0 : this.currentIndex + 1;
      this.currentIndex = this.currentIndex === 6 ? 0 : this.currentIndex + 1;
   }
}
