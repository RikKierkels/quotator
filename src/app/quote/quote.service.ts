import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environment } from 'src/app/shared/environment';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Quote } from 'src/app/quote/quote.interface';
import { STORAGE_KEYS, StorageKeys } from 'src/app/shared/storage.tokens';
import { StorageService } from 'src/app/shared/storage.service';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  private favoritesSubject = new BehaviorSubject<Quote[]>([]);

  fetchQuoteSubject = new ReplaySubject<void>(1);
  quote$ = this.fetchQuoteSubject.pipe(
    switchMap(() => {
      return this.httpClient.get<Quote>(
        `${this.environment.apiUrl}/random.json`
      );
    })
  );

  private get favorites(): Quote[] {
    return this.favoritesSubject.getValue();
  }

  get favorites$(): Observable<Quote[]> {
    return this.favoritesSubject.asObservable();
  }

  constructor(
    private readonly httpClient: HttpClient,
    private readonly environment: Environment,
    private readonly storageService: StorageService,
    @Inject(STORAGE_KEYS) private readonly storageKeys: StorageKeys
  ) {}

  addToFavorites(newQuote: Quote) {
    let favorites = this.favorites;

    if (favorites.some(quote => quote.id === newQuote.id)) {
      return favorites;
    }

    favorites = [...favorites, newQuote];
    this.storageService.set<Quote[]>(this.storageKeys.favorites, favorites);
    this.favoritesSubject.next(favorites);
  }
}
