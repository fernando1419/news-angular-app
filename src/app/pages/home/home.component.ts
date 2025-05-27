import { Component } from '@angular/core';
import { ShowArticleComponent } from 'src/app/components/articles/show-article/show-article.component';

@Component({
   selector: 'app-home',
   standalone: true,
   imports: [ShowArticleComponent],
   templateUrl: './home.component.html',
   styleUrl: './home.component.css',
})
export class HomeComponent {

}
