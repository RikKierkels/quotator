import { TestBed } from '@angular/core/testing';

import { QuoteFavoriteService } from './quote-favorite.service';

describe('QuoteFavoriteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuoteFavoriteService = TestBed.get(QuoteFavoriteService);
    expect(service).toBeTruthy();
  });
});
