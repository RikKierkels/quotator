import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { QuoteService } from 'src/app/quote/quote.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  quote$ = this.quoteService.quote$.pipe(
    map(({ author, quote }) => ({ author, quote }))
  );

  constructor(private readonly quoteService: QuoteService) {}

  ngOnInit(): void {
    this.quoteService.fetchQuote.next();
  }
}
