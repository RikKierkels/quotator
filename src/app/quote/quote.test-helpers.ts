import * as faker from 'faker';
import { Quote } from 'src/app/quote/quote.interface';

export const makeQuote = (): Quote => ({
  _id: faker.random.uuid(),
  content: faker.lorem.sentence(),
  author: `${faker.name.firstName()} ${faker.name.lastName()}`
});
