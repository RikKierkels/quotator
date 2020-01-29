import { QuoteSaveService } from 'src/app/quote/quote-save.service';
import { StorageService } from 'src/app/shared/storage.service';
import { makeQuote } from 'src/app/quote/quote.test-helpers';

jest.mock('src/app/shared/storage.service');

describe('QuoteSaveService', () => {
  let service: QuoteSaveService;
  let storageService: jest.Mocked<StorageService>;

  beforeEach(() => {
    const storageKeys = { saved: 'app.saved' };
    storageService = new StorageService(null) as jest.Mocked<StorageService>;
    service = new QuoteSaveService(storageService, storageKeys);
  });

  describe('While syncing the stored quotes', () => {
    it('should sync the stored quotes', done => {
      const storedQuotes = [makeQuote(), makeQuote()];
      storageService.get.mockReturnValueOnce(storedQuotes);

      service.syncWithStorage();

      service.quotes$.subscribe(quotes => {
        expect(quotes).toEqual(storedQuotes);
        done();
      });
    });

    it('should set a default value if there are no stored quotes', done => {
      storageService.get.mockReturnValueOnce(null);

      service.syncWithStorage();

      service.quotes$.subscribe(quotes => {
        expect(quotes).toEqual([]);
        done();
      });
    });
  });

  describe('While saving a new quote', () => {
    it('should store the new quote', () => {
      const newQuote = makeQuote();

      service.save(newQuote);

      expect(storageService.set).toHaveBeenCalledWith('app.saved', [newQuote]);
    });

    it('should update the collection of quotes', done => {
      const newQuote = makeQuote();

      service.save(newQuote);

      service.quotes$.subscribe(quotes => {
        expect(quotes).toEqual([newQuote]);
        done();
      });
    });
  });

  describe('While saving an already saved quote', () => {
    it('should not store the new Quote', () => {
      const existingQuote = makeQuote();

      service.save(existingQuote);
      service.save(existingQuote);

      expect(storageService.set).toHaveBeenCalledTimes(1);
    });

    it('should not update the collection of quotes', done => {
      const existingQuote = makeQuote();

      service.save(existingQuote);
      service.save(existingQuote);

      service.quotes$.subscribe(quotes => {
        expect(quotes).toEqual([existingQuote]);
        done();
      });
    });
  });

  describe('While removing a stored quote', () => {
    it('should remove the quote from the storage', () => {
      const storedQuote = makeQuote();
      service.save(storedQuote);

      service.remove(storedQuote.id);

      expect(storageService.set).toHaveBeenCalledWith('app.saved', []);
    });

    it('should update the collection of quotes', done => {
      const storedQuote = makeQuote();
      service.save(storedQuote);

      service.remove(storedQuote.id);

      service.quotes$.subscribe(quotes => {
        expect(quotes).toEqual([]);
        done();
      });
    });
  });
});
