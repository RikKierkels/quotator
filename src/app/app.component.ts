import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { QuoteService } from 'src/app/quote/quote.service';
import { Quote } from 'src/app/quote/quote.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  quote$ = this.quoteService.quote$;
  favorites$ = this.quoteService.favorites$;

  constructor(private readonly quoteService: QuoteService) {}

  ngOnInit(): void {
    this.quoteService.fetchQuoteSubject.next();
  }

  fetchNewQuote(): void {
    this.quoteService.fetchQuoteSubject.next();
  }

  addToFavorites(quote: Quote) {
    this.quoteService.addToFavorites(quote);
  }
}
