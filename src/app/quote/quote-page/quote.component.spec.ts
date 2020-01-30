import { QuoteService } from 'src/app/quote/services/quote.service';
import { QuoteSaveService } from 'src/app/quote/services/quote-save.service';
import { QuoteComponent } from 'src/app/quote/quote-page/quote.component';
import { BehaviorSubject } from 'rxjs';
import { Quote } from 'src/app/quote/quote.interface';
import { makeQuote } from 'src/app/quote/quote.test-helpers';

jest.mock('src/app/quote/services/quote.service');
jest.mock('src/app/quote/services/quote-save.service');

describe('QuoteComponent', () => {
  let quoteService: jest.Mocked<QuoteService>;
  let quoteSaveService: jest.Mocked<QuoteSaveService>;
  let quoteSubject: BehaviorSubject<Quote>;
  let quoteSavedSubject: BehaviorSubject<Quote[]>;

  beforeEach(() => {
    // prettier-ignore
    quoteSaveService = new QuoteSaveService(null, null) as jest.Mocked<QuoteSaveService>;
    quoteService = new QuoteService(null, null) as jest.Mocked<QuoteService>;
    quoteSubject = new BehaviorSubject<Quote>(null);
    quoteSavedSubject = new BehaviorSubject<Quote[]>([]);

    // @ts-ignore
    quoteService.fetchQuote = {
      next: jest.fn()
    };
    quoteService.quote$ = quoteSubject.asObservable();

    Object.defineProperty(quoteSaveService, 'quotes$', {
      get: () => quoteSavedSubject.asObservable()
    });
  });

  it('should fetch a quote when the component loads', () => {
    const component = new QuoteComponent(quoteService, quoteSaveService);

    component.ngOnInit();

    expect(quoteService.fetchQuote.next).toHaveBeenCalledTimes(1);
  });

  it('should flag a new quote that has been previously saved', done => {
    const component = new QuoteComponent(quoteService, quoteSaveService);
    const quote = makeQuote();

    quoteSubject.next(quote);
    quoteSavedSubject.next([quote]);

    component.vm$.subscribe(vm => {
      expect(vm).toEqual({ quote, savedQuotes: [quote], isSaved: true });
      done();
    });
  });
});
