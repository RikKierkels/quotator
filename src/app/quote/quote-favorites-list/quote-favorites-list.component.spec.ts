import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteFavoritesListComponent } from './quote-favorites-list.component';

describe('QuoteFavoritesListComponent', () => {
  let component: QuoteFavoritesListComponent;
  let fixture: ComponentFixture<QuoteFavoritesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuoteFavoritesListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteFavoritesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
