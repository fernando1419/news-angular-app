import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';

@Component({
   selector: 'app-main-layout',
   standalone: true,
   imports: [RouterOutlet, NavbarComponent, SidebarComponent],
   templateUrl: './main-layout.component.html',
   styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {
   title = 'news-app';
}
