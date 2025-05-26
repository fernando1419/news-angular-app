import { Component, computed, Signal, signal, WritableSignal } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

@Component({
   selector: 'app-navbar',
   standalone: true,
   imports: [RouterLink],
   templateUrl: './navbar.component.html',
   styleUrl: './navbar.component.css',
})
export class NavbarComponent {
   private currentUrl: WritableSignal<string> = signal('');
   readonly currentId: WritableSignal<string | null> = signal<string | null>(null);

   constructor(private router: Router) {
      this.router.events.pipe(filter(event => event instanceof NavigationEnd))
         .subscribe((event: NavigationEnd) => {
            this.currentUrl.set(event.urlAfterRedirects);
            this.currentId.set(this.findArticleId());
         });
   }

   private findArticleId(): string | null {
      let route: ActivatedRouteSnapshot | null = this.router.routerState.snapshot.root;
      while (route) {
         if (route.paramMap.has('id')) {
            return route.paramMap.get('id');
         }
         route = route.firstChild;
      }
      return null;
   }

   showNewArticleButton: Signal<boolean> = computed(() => this.currentUrl() === '/articles');

   showEditDeleteArticlesButtons: Signal<boolean> = computed(() => {
      const url: string = this.currentUrl();
      return url.startsWith('/articles/') && url.split('/').length === 3 && this.currentId() !== null;
   });

   protected onDelete(): void {
      console.log('onDelete()...');
   }
}

