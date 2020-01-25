import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environment } from 'src/app/shared/environment';
import { ReplaySubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Quote } from 'src/app/quote/quote.interface';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  fetchQuoteSubject = new ReplaySubject<void>(1);

  quote$ = this.fetchQuoteSubject.pipe(
    switchMap(() => {
      return this.httpClient.get<Quote>(
        `${this.environment.apiUrl}/random.json`
      );
    })
  );

  constructor(
    private readonly httpClient: HttpClient,
    private readonly environment: Environment
  ) {}
}
