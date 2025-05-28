import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
   private readonly loadingService = inject(LoadingService);

   intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      this.loadingService.show(); // activate loading...
      return next.handle(req).pipe(
         finalize(() => this.loadingService.hide()), // deactivate loading.. when request finishes (error or success)
      );
   }
}
