import { Routes } from '@angular/router';
import { ArticleModalFormComponent } from 'src/app/components/articles/article-modal-form/article-modal-form.component';

export const routes: Routes = [
   { path: '', redirectTo: '/articles', pathMatch: 'full' },
   {
      path: 'articles',
      loadComponent: () => import('src/app/components/articles/article/article.component').then(m => m.ArticleComponent),
      children: [
         { path: 'new', component: ArticleModalFormComponent },
         { path: ':id/edit', component: ArticleModalFormComponent },
      ],
   },
   {
      path: 'articles/:id',
      loadComponent: () => import('src/app/components/articles/article/article.component').then(m => m.ArticleComponent),
   },
];
