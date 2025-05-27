import { Routes } from '@angular/router';
import { AddArticleComponent } from 'src/app/components/articles/add-article/add-article.component';
import { DeleteArticleComponent } from 'src/app/components/articles/delete-article/delete-article.component';
import { EditArticleComponent } from 'src/app/components/articles/edit-article/edit-article.component';

export const routes: Routes = [
   { path: '', redirectTo: '/articles', pathMatch: 'full' },
   {
      path: 'articles',
      loadComponent: () => import('src/app/components/articles/article/article.component').then(m => m.ArticleComponent),
      children: [
         { path: 'new', component: AddArticleComponent },
         { path: ':id/edit', component: EditArticleComponent },
         { path: ':id/delete', component: DeleteArticleComponent },
      ],
   },
   {
      path: 'articles/:id',
      loadComponent: () => import('src/app/components/articles/article/article.component').then(m => m.ArticleComponent),
   },
];
