import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideArticleComponent } from './aside-article.component';

describe('AsideArticleComponent', () => {
  let component: AsideArticleComponent;
  let fixture: ComponentFixture<AsideArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsideArticleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsideArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
