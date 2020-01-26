import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteSavedListComponent } from 'src/app/quote/quote-saved-list/quote-saved-list.component';

describe('QuoteSavedListComponent', () => {
  let component: QuoteSavedListComponent;
  let fixture: ComponentFixture<QuoteSavedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuoteSavedListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteSavedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
