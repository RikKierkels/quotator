import { Inject, Injectable } from '@angular/core';
import { StorageService } from 'src/app/shared/storage.service';
import { STORAGE_KEYS, StorageKeys } from 'src/app/shared/storage.tokens';
import { Quote } from 'src/app/quote/quote.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuoteSaveService {
  private savedSubject = new BehaviorSubject<Quote[]>([]);
  private storageKey = this.storageKeys.saved;

  private get quotes(): Quote[] {
    return this.savedSubject.getValue();
  }

  get quotes$(): Observable<Quote[]> {
    return this.savedSubject.asObservable();
  }

  constructor(
    private readonly storageService: StorageService,
    @Inject(STORAGE_KEYS) private readonly storageKeys: StorageKeys
  ) {}

  syncWithStorage(): void {
    const quotes = this.storageService.get<Quote[]>(this.storageKey);
    this.savedSubject.next(quotes || []);
  }

  save(newQuote: Quote): void {
    let quotes = this.quotes;

    if (quotes.some(quote => quote.id === newQuote.id)) {
      return;
    }

    quotes = [...quotes, newQuote];
    this.storageService.set<Quote[]>(this.storageKey, quotes);
    this.savedSubject.next(quotes);
  }

  remove(id: number): void {
    const quotes = this.quotes.filter(quote => quote.id !== id);
    this.storageService.set<Quote[]>(this.storageKey, quotes);
    this.savedSubject.next(quotes);
  }
}
