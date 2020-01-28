import { TestBed, async } from '@angular/core/testing';
import { QuoteComponent } from 'src/app/quote.component';

describe('QuoteComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuoteComponent]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(QuoteComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
