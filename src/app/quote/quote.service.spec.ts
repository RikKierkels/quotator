import { QuoteService } from 'src/app/quote/quote.service';
import { Environment } from 'src/app/shared/environment';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { Quote } from 'src/app/quote/quote.interface';

jest.mock('@angular/common/http');

describe('QuoteService', () => {
  let httpClient: jest.Mocked<HttpClient>;
  let service: QuoteService;

  beforeEach(() => {
    const environment: Environment = { apiUrl: 'https://some-api.com' };
    httpClient = new HttpClient(null) as jest.Mocked<HttpClient>;
    service = new QuoteService(httpClient, environment);
  });

  it('should fetch a random quote from the api', done => {
    const expectedQuote: Quote = {
      _id: '1',
      content: 'Mocking the environment is easy now.',
      author: 'R.J.M. Kierkels'
    };
    httpClient.get.mockImplementationOnce((url: string) => {
      return url === 'https://some-api.com/random'
        ? of(expectedQuote)
        : throwError('api url is incorrect');
    });

    service.quote$.subscribe(
      quote => {
        expect(quote).toEqual(expectedQuote);
        done();
      },
      error => fail(error)
    );

    service.fetchQuote.next();
  });

  it('should show an error quote if the api call fails', done => {
    const errorQuote: Quote = {
      _id: '######',
      content:
        'Oops, looks like something went wrong! Try to fetch a new quote :)',
      author: 'R.J.M. Kierkels'
    };
    httpClient.get.mockReturnValueOnce(throwError(null));

    service.quote$.subscribe(
      quote => {
        expect(quote).toEqual(errorQuote);
        done();
      },
      () => fail()
    );

    service.fetchQuote.next();
  });
});
