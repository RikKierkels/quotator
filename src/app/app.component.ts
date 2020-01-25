import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { QuoteService } from 'src/app/quote/quote.service';
import { Quote } from 'src/app/quote/quote.interface';
import { QuoteFavoriteService } from 'src/app/quote/quote-favorite.service';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Icon } from 'src/app/shared/icon.enum';

@Component({
  selector: 'qu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  icon = Icon;

  vm$ = combineLatest([
    this.quoteService.quote$,
    this.quoteFavoriteService.favorites$
  ]).pipe(
    map(([quote, favorites]) => {
      const isSaved = quote && favorites.some(fav => fav.id === quote.id);
      return { quote, favorites, isSaved };
    })
  );

  constructor(
    private readonly quoteService: QuoteService,
    private readonly quoteFavoriteService: QuoteFavoriteService
  ) {}

  ngOnInit(): void {
    this.quoteService.fetchQuoteSubject.next();
  }

  fetchQuote(): void {
    this.quoteService.fetchQuoteSubject.next();
  }

  addFavorite(quote: Quote): void {
    this.quoteFavoriteService.addFavorite(quote);
  }

  removeFavorite(id: number): void {
    this.quoteFavoriteService.removeFavorite(id);
  }
}
