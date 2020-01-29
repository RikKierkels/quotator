import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE } from 'src/app/shared/storage.tokens';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(@Inject(LOCAL_STORAGE) private readonly storage: Storage) {}

  get<T>(key: string): T {
    const item = this.storage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  set<T>(key: string, item: T): void {
    this.storage.setItem(key, JSON.stringify(item));
  }
}
