import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Article } from 'src/app/models/article.interface';

const API_URL: string = `http://localhost:3000/articles`;

@Injectable({
   providedIn: 'root',
})
export class ArticleApiService {
   public articles = signal<Article[]>([]);

   public errorMessage = signal<string | null>(null);

   constructor(private http: HttpClient) { }

   getAllArticles(): Observable<Article[]> {
      return this.http.get<Article[]>(API_URL).pipe(
         catchError((error) => this.handleError(error)),
         tap((articles) => this.articles.set(articles)),
      );
   }

   getArticleById(id: number | string): Observable<Article> {
      return this.http.get<Article>(`${API_URL}/${id}`).pipe(
         catchError(error => this.handleError(error)),
      );
   }

   addArticle(article: Article): Observable<Article> {
      return this.http.post<Article>(API_URL, article).pipe(
         catchError((error) => this.handleError(error)),
         tap(() => this.refreshArticles()),
      );
   }

   updateArticle(id: number | string, article: Article): Observable<Article> {
      return this.http.patch<Article>(`${API_URL}/${id}`, article).pipe(
         catchError((error) => this.handleError(error)),
         tap(() => this.refreshArticles()),
      );
   }

   deleteArticle(id: number | string): Observable<void> {
      return this.http.delete<void>(`${API_URL}/${id}`).pipe(
         catchError((error) => this.handleError(error)),
         tap(() => this.refreshArticles()),
      );
   }

   private refreshArticles() {
      this.getAllArticles().subscribe();
   }

   private handleError(error: HttpErrorResponse) {
      console.error('API Error:', error);
      let errorMessage = 'Something went wrong. Please try again later.';
      if (error.status === 400) {
         errorMessage = 'Bad Request. Please check your input.';
      } else if (error.status === 404) {
         errorMessage = 'Not Found. The resource you are looking for does not exist.';
      } else if (error.status >= 500) {
         errorMessage = 'Server Error. Please try again later.';
      }

      this.errorMessage.set(errorMessage);

      return throwError(() => new HttpErrorResponse({
         error: errorMessage,
         status: error.status,
         statusText: error.statusText,
         url: error.url ?? undefined,
      }));
   }
}
