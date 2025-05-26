import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
   selector: 'app-article-modal-form',
   standalone: true,
   imports: [],
   templateUrl: './article-modal-form.component.html',
   styleUrl: './article-modal-form.component.css',
})
export class ArticleModalFormComponent implements OnInit, AfterViewInit {
   @ViewChild('modal') modalRef!: ElementRef<HTMLDialogElement>;

   protected form = { title: '', content: '' }; // TODO CHANGE HERE!!
   protected isEditing: boolean = false;
   protected articleId: string | null = null;

   constructor(private router: Router, private route: ActivatedRoute) { }

   ngOnInit() {
      this.articleId = this.route.snapshot.paramMap.get('id');
      this.isEditing = !!this.articleId;

      if (this.isEditing) {
         this.form = {
            title: 'Testing article',
            content: 'Testing content',
         };
      }
   }

   ngAfterViewInit() {
      this.modalRef.nativeElement.showModal();
   }

   onClose() {
      if (this.isEditing) {
         this.router.navigate(['/articles', this.articleId]);
      } else {
         this.router.navigate(['/articles']);
      }
   }

   onSubmit() {
      if (this.isEditing) {
         console.log('Editing article...', this.form);
      } else {
         console.log('Creating article...', this.form);
      }
      this.onClose();
   }
}
