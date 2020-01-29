import * as faker from 'faker';
import { Quote } from './quote.interface';

export const makeQuote = (): Quote => ({
  id: faker.random.number(),
  author: `${faker.name.firstName()} ${faker.name.lastName()}`,
  quote: faker.lorem.sentence(),
  permalink: ''
});
