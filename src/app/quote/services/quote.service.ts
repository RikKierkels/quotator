import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environment } from 'src/app/shared/environment.model';
import { Observable, of, ReplaySubject } from 'rxjs';
import { catchError, exhaustMap, map, shareReplay } from 'rxjs/operators';
import { Quote } from 'src/app/quote/quote.interface';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  errorQuote: Quote = {
    _id: '######',
    content:
      'Oops, looks like something went wrong! Try to fetch a new quote :)',
    author: 'R.J.M. Kierkels'
  };
  fetchQuote = new ReplaySubject<void>(1);

  quote$: Observable<Quote> = this.fetchQuote.pipe(
    exhaustMap(() => {
      return this.httpClient
        .get<Quote>(`${this.environment.apiUrl}/random`)
        .pipe(catchError(() => of(this.errorQuote)));
    }),
    shareReplay(1)
  );

  constructor(
    private readonly httpClient: HttpClient,
    private readonly environment: Environment
  ) {}
}
