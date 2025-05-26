import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleModalFormComponent } from './article-modal-form.component';

describe('ArticleModalFormComponent', () => {
  let component: ArticleModalFormComponent;
  let fixture: ComponentFixture<ArticleModalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleModalFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
