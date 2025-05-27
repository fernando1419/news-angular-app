import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Article } from 'src/app/models/article.interface';
import { ArticleApiService } from 'src/app/services/article-api.service';

export const articleResolver: ResolveFn<Article | null> = (route) => {
   const id = Number(route.paramMap.get('id'));
   if (!id || isNaN(id)) {
      return null;
   }
   return inject(ArticleApiService).getArticleById(id);
};
