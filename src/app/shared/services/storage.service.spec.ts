import { StorageService } from 'src/app/shared/services/storage.service';

const storageMock: jest.Mocked<Storage> = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  key: jest.fn(),
  length: 0
};

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    service = new StorageService(storageMock);
  });

  describe('While retrieving an existing item', () => {
    it('should get the stored item by key', () => {
      service.get('app.test');
      expect(storageMock.getItem).toHaveBeenCalledWith('app.test');
    });

    it('should return the stored item as JSON', () => {
      const itemToStore = { test: 123 };
      storageMock.getItem.mockReturnValueOnce(JSON.stringify(itemToStore));

      const storedItem = service.get('app.test');

      expect(storedItem).toEqual(itemToStore);
    });
  });

  describe('While retrieving an non-existent item', () => {
    it('should return a null value', () => {
      storageMock.getItem.mockReturnValueOnce(undefined);
      expect(service.get('app.test')).toBe(null);
    });
  });

  describe('While storing an item', () => {
    it('should store the item', () => {
      const itemToStore = { test: 123 };

      service.set('app.test', itemToStore);

      expect(storageMock.setItem).toHaveBeenCalledWith(
        'app.test',
        JSON.stringify(itemToStore)
      );
    });
  });
});
