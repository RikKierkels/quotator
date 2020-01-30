import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Icon } from 'src/app/shared/icon.enum';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { QuoteService } from 'src/app/quote/services/quote.service';
import { QuoteSaveService } from 'src/app/quote/services/quote-save.service';
import { Quote } from 'src/app/quote/quote.interface';

@Component({
  selector: 'qu-quote',
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
        savedQuote => savedQuote._id === quote._id
      );
      return { quote, savedQuotes, isSaved };
    })
  );

  constructor(
    private readonly quoteService: QuoteService,
    private readonly quoteSaveService: QuoteSaveService
  ) {}

  ngOnInit(): void {
    this.fetchQuote();
  }

  fetchQuote(): void {
    this.quoteService.fetchQuote.next();
  }

  saveQuote(quote: Quote): void {
    this.quoteSaveService.save(quote);
  }

  removeQuote(id: string): void {
    this.quoteSaveService.remove(id);
  }
}
