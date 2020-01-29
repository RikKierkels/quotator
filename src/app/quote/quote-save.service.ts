import { Inject, Injectable } from '@angular/core';
import { StorageService } from 'src/app/shared/storage.service';
import { STORAGE_KEYS, StorageKeys } from 'src/app/shared/storage.tokens';
import { Quote } from 'src/app/quote/quote.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuoteSaveService {
  private savedQuotes = new BehaviorSubject<Quote[]>([]);
  private storageKey = this.storageKeys.saved;

  private get quotes(): Quote[] {
    return this.savedQuotes.getValue();
  }

  get quotes$(): Observable<Quote[]> {
    return this.savedQuotes.asObservable();
  }

  constructor(
    private readonly storageService: StorageService,
    @Inject(STORAGE_KEYS) private readonly storageKeys: StorageKeys
  ) {}

  syncWithStorage(): void {
    const quotes = this.storageService.get<Quote[]>(this.storageKey);
    this.savedQuotes.next(quotes || []);
  }

  save(newQuote: Quote): void {
    let quotes = this.quotes;

    if (quotes.some(quote => quote._id === newQuote._id)) {
      return;
    }

    quotes = [newQuote, ...quotes];
    this.storageService.set<Quote[]>(this.storageKey, quotes);
    this.savedQuotes.next(quotes);
  }

  remove(id: string): void {
    const quotes = this.quotes.filter(quote => quote._id !== id);
    this.storageService.set<Quote[]>(this.storageKey, quotes);
    this.savedQuotes.next(quotes);
  }
}
