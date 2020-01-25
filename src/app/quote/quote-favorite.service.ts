import { Inject, Injectable } from '@angular/core';
import { StorageService } from 'src/app/shared/storage.service';
import { STORAGE_KEYS, StorageKeys } from 'src/app/shared/storage.tokens';
import { Quote } from 'src/app/quote/quote.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuoteFavoriteService {
  private favoritesSubject = new BehaviorSubject<Quote[]>([]);

  private get favorites(): Quote[] {
    return this.favoritesSubject.getValue();
  }

  get favorites$(): Observable<Quote[]> {
    return this.favoritesSubject.asObservable();
  }

  constructor(
    private readonly storageService: StorageService,
    @Inject(STORAGE_KEYS) private readonly storageKeys: StorageKeys
  ) {}

  add(newQuote: Quote) {
    let favorites = this.favorites;

    if (favorites.some(quote => quote.id === newQuote.id)) {
      return favorites;
    }

    favorites = [...favorites, newQuote];
    this.storageService.set<Quote[]>(this.storageKeys.favorites, favorites);
    this.favoritesSubject.next(favorites);
  }
}
