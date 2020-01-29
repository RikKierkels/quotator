import { QuoteComponent } from 'src/app/quote.component';
import { QuoteService } from 'src/app/quote/quote.service';
import { QuoteSaveService } from 'src/app/quote/quote-save.service';
import { makeQuote } from 'src/app/quote/quote.test-helpers';
import { of, Subject } from 'rxjs';
import { Quote } from 'src/app/quote/quote.interface';

jest.mock('src/app/quote/quote.service');
jest.mock('src/app/quote/quote-save.service');

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
