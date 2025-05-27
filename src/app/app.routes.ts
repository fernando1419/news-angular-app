import { Routes } from '@angular/router';
import { articleIdGuard } from 'src/app/guards/article-id.guard';
import { MainLayoutComponent } from 'src/app/layouts/main-layout/main-layout.component';
import { articleResolver } from 'src/app/resolvers/article.resolver';

export const routes: Routes = [
   // { path: '', redirectTo: '/', pathMatch: 'full' },
   {
      path: '',
      component: MainLayoutComponent,
      children: [
         { path: '', title: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
         {
            path: 'articles',
            title: 'articles',
            // TODO: CHANGE HERE LATER ON TO articles-list.
            loadComponent: () => import('src/app/components/articles/show-article/show-article.component').then(m => m.ShowArticleComponent),
         },
         {
            path: 'articles/new',
            title: 'New Article',
            loadComponent: () => import('./components/articles/add-article/add-article.component').then(m => m.AddArticleComponent),
         },
         {
            path: 'articles/:id',
            title: 'Article Detail',
            loadComponent: () => import('./components/articles/show-article/show-article.component').then(m => m.ShowArticleComponent),
            resolve: { article: articleResolver },
            canActivate: [articleIdGuard],
         },
         {
            path: 'articles/:id/edit',
            title: 'Edit Article',
            loadComponent: () => import('./components/articles/edit-article/edit-article.component').then(m => m.EditArticleComponent),
            resolve: { article: articleResolver },
            canActivate: [articleIdGuard],
         },
         {
            path: 'articles/:id/delete',
            title: 'Delete Article',
            loadComponent: () => import('./components/articles/delete-article/delete-article.component').then(m => m.DeleteArticleComponent),
            resolve: { article: articleResolver },
            canActivate: [articleIdGuard],
         },
      ],
   },
   { path: '**', loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent) },
];
