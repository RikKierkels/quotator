import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { QuoteService } from 'src/app/quote/quote.service';
import { Quote } from 'src/app/quote/quote.interface';
import { QuoteFavoriteService } from 'src/app/quote/quote-favorite.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  quote$ = this.quoteService.quote$;
  favorites$ = this.quoteFavoriteService.favorites$;

  constructor(
    private readonly quoteService: QuoteService,
    private readonly quoteFavoriteService: QuoteFavoriteService
  ) {}

  ngOnInit(): void {
    this.quoteService.fetchQuoteSubject.next();
  }

  fetchNewQuote(): void {
    this.quoteService.fetchQuoteSubject.next();
  }

  addToFavorites(quote: Quote) {
    this.quoteFavoriteService.addFavorite(quote);
  }
}
