import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';

@Component({
   selector: 'app-root',
   standalone: true,
   imports: [RouterOutlet, SidebarComponent, NavbarComponent],
   templateUrl: './app.component.html',
   styleUrl: './app.component.css',
})
export class AppComponent {
   title = 'news-app';
}
