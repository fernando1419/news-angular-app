import { Component, Input } from '@angular/core';

@Component({
   selector: 'app-article-aside',
   standalone: true,
   imports: [],
   templateUrl: './article-aside.component.html',
   styleUrl: './article-aside.component.css',
})
export class ArticleAsideComponent {
   @Input() title: string = '';
   @Input() author: string = '';
   @Input() imageUrl: string = '';
   @Input() backgroundColor: string = '';
}
