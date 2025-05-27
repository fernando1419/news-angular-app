import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models/article.interface';

@Component({
   selector: 'app-article',
   standalone: true,
   imports: [],
   templateUrl: './show-article.component.html',
   styleUrl: './show-article.component.css',
})
export class ShowArticleComponent implements OnInit, OnDestroy {
   private dataSubscription: Subscription | undefined;
   protected article: Article | null = null;

   private readonly route = inject(ActivatedRoute);

   ngOnInit(): void {
      this.dataSubscription = this.route.data.subscribe(data => {
         this.article = data['article']; // resolver gets article before the component renders
      });
   }

   ngOnDestroy(): void {
      this.dataSubscription?.unsubscribe();
   }
}
