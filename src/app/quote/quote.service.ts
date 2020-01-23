import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environment } from 'src/app/shared/environment';
import { BehaviorSubject, Subject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Quote } from 'src/app/quote/quote.interface';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  fetchQuote = new BehaviorSubject<void>(null);

  quote$ = this.fetchQuote.pipe(
    switchMap(() =>
      this.httpClient.get<Quote>(`${this.environment.apiUrl}/random.json`)
    )
  );

  constructor(
    private readonly httpClient: HttpClient,
    private readonly environment: Environment
  ) {}
}
