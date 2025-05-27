import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { FeedbackModalComponent } from 'src/app/components/shared/feedback-modal/feedback-modal.component';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { ModalFeedbackService } from 'src/app/services/modal-feedback.service';

@Component({
   selector: 'app-root',
   standalone: true,
   imports: [RouterOutlet, SidebarComponent, NavbarComponent, FeedbackModalComponent],
   templateUrl: './app.component.html',
   styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewInit {
   @ViewChild('globalModal') modal!: FeedbackModalComponent;
   title = 'news-app';

   constructor(private modalService: ModalFeedbackService) { }

   ngAfterViewInit(): void {
      this.modalService.register(this.modal);
   }
}
