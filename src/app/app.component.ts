import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ArticleComponent } from 'src/app/components/articles/article/article.component';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';

@Component({
   selector: 'app-root',
   standalone: true,
   imports: [RouterOutlet, ArticleComponent, SidebarComponent],
   templateUrl: './app.component.html',
   styleUrl: './app.component.css',
})
export class AppComponent {
   title = 'news-app';
}
