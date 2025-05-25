import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ArticleComponent } from 'src/app/components/article/article.component';

@Component({
   selector: 'app-root',
   standalone: true,
   imports: [RouterOutlet, ArticleComponent],
   templateUrl: './app.component.html',
   styleUrl: './app.component.css',
})
export class AppComponent {
   title = 'news-app';
}
