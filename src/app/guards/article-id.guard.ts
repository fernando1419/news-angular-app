import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ArticleApiService } from 'src/app/services/article-api.service';
import { ModalFeedbackService } from 'src/app/services/modal-feedback.service';

export const articleIdGuard: CanActivateFn = (route) => {
   const id = Number(route.paramMap.get('id'));
   const router = inject(Router);
   const articleService = inject(ArticleApiService);
   const modalMessage = inject(ModalFeedbackService);

   if (!id || isNaN(id) || id <= 0) {
      modalMessage.show('Invalid Article Id, redirecting to home page...', 'error');
      router.navigate(['/']);
      return of(false);
   }

   return articleService.getArticleById(id).pipe(
      map(() => true),
      catchError(() => {
         // router.navigate(['/404'], { skipLocationChange: true });
         modalMessage.show('Article not found, redirecting to home page...', 'warning');
         router.navigate(['/']);
         return of(false);
      }),
   );
};
