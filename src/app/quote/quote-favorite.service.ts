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
  private storageKey = this.storageKeys.favorites;

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

  syncWithStorage(): void {
    const favorites = this.storageService.get<Quote[]>(this.storageKey);
    this.favoritesSubject.next(favorites || []);
  }

  addFavorite(newQuote: Quote): void {
    let favorites = this.favorites;

    if (favorites.some(quote => quote.id === newQuote.id)) {
      return;
    }

    favorites = [...favorites, newQuote];
    this.storageService.set<Quote[]>(this.storageKey, favorites);
    this.favoritesSubject.next(favorites);
  }

  removeFavorite(id: number): void {
    const favorites = this.favorites.filter(quote => quote.id !== id);
    this.storageService.set<Quote[]>(this.storageKey, favorites);
    this.favoritesSubject.next(favorites);
  }
}
