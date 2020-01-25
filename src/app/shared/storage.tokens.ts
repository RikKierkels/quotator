import { InjectionToken } from '@angular/core';

export const LOCAL_STORAGE = new InjectionToken<Storage>('Local Storage', {
  providedIn: 'root',
  factory: () => window.localStorage
});

export type StorageKeys = { [key: string]: string };
export const STORAGE_KEYS = new InjectionToken<StorageKeys>('Storage Keys', {
  providedIn: 'root',
  factory: () => ({ favorites: 'app.favorites' })
});
