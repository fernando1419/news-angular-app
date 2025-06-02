import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Article } from 'src/app/models/article.interface';
import { ArticleApiService } from 'src/app/services/article-api.service';

export const articleResolver: ResolveFn<Article | null> = (route) => {
   const id = Number(route.paramMap.get('id'));
   if (!id || isNaN(id)) {
      return of(null);
   }

   return inject(ArticleApiService).getArticleById(id).pipe(
      catchError(() => of(null)),
   );
};
