import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models/article.interface';

@Component({
   selector: 'app-article',
   standalone: true,
   imports: [RouterLink],
   templateUrl: './show-article.component.html',
   styleUrl: './show-article.component.css',
})
export class ShowArticleComponent implements OnInit, OnDestroy {
   private dataSubscription: Subscription | undefined;
   private readonly route = inject(ActivatedRoute);

   @Input() article: Article | null = null;

   ngOnInit(): void {
      this.dataSubscription = this.route.data.subscribe(data => {
         this.article = data['article'];
      });
   }
   ngOnDestroy(): void {
      this.dataSubscription?.unsubscribe();
   }
}
