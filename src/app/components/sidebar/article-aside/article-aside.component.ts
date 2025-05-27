import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
   selector: 'app-article-aside',
   standalone: true,
   imports: [RouterLink],
   templateUrl: './article-aside.component.html',
   styleUrl: './article-aside.component.css',
})
export class ArticleAsideComponent {
   @Input() id: number = 0;
   @Input() title: string = '';
   @Input() author: string = '';
   @Input() imageUrl: string = '';
   @Input() backgroundColor: string = '';
}
