import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { QuoteService } from 'src/app/quote/quote.service';
import { Quote } from 'src/app/quote/quote.interface';
import { QuoteSaveService } from 'src/app/quote/quote-save.service';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Icon } from 'src/app/shared/icon.enum';

@Component({
  selector: 'qu-root',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuoteComponent implements OnInit {
  icon = Icon;

  vm$ = combineLatest([
    this.quoteService.quote$,
    this.quoteSaveService.quotes$
  ]).pipe(
    map(([quote, savedQuotes]) => {
      const isSaved = savedQuotes.some(
        savedQuote => savedQuote.id === quote.id
      );
      return { quote, savedQuotes, isSaved };
    })
  );

  constructor(
    private readonly quoteService: QuoteService,
    private readonly quoteSaveService: QuoteSaveService
  ) {}

  ngOnInit(): void {
    this.quoteService.fetchQuote.next();
  }

  fetchQuote(): void {
    this.quoteService.fetchQuote.next();
  }

  saveQuote(quote: Quote): void {
    this.quoteSaveService.save(quote);
  }

  removeQuote(id: number): void {
    this.quoteSaveService.remove(id);
  }
}
