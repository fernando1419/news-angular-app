import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleAsideComponent } from './article-aside.component';

describe('ArticleAsideComponent', () => {
   let component: ArticleAsideComponent;
   let fixture: ComponentFixture<ArticleAsideComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         imports: [ArticleAsideComponent],
      })
         .compileComponents();

      fixture = TestBed.createComponent(ArticleAsideComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});
