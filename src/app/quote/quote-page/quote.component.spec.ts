import { QuoteService } from 'src/app/quote/services/quote.service';
import { QuoteSaveService } from 'src/app/quote/services/quote-save.service';
import { QuoteComponent } from 'src/app/quote/quote-page/quote.component';

jest.mock('src/app/quote/services/quote.service');
jest.mock('src/app/quote/services/quote-save.service');

describe('QuoteComponent', () => {
  let quoteService: jest.Mocked<QuoteService>;
  let quoteSaveService: jest.Mocked<QuoteSaveService>;

  beforeEach(() => {
    // prettier-ignore
    quoteSaveService = new QuoteSaveService(null, null) as jest.Mocked<QuoteSaveService>;
    quoteService = new QuoteService(null, null) as jest.Mocked<QuoteService>;

    // @ts-ignore
    quoteService.fetchQuote = {
      next: jest.fn()
    };
  });

  it('should fetch a quote when the component loads', () => {
    const component = new QuoteComponent(quoteService, quoteSaveService);

    component.ngOnInit();

    expect(quoteService.fetchQuote.next).toHaveBeenCalledTimes(1);
  });
});
