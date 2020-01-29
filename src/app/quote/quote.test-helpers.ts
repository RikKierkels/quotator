import * as faker from 'faker';
import { Quote } from './quote.interface';

export const makeQuote = (): Quote => ({
  _id: faker.random.uuid(),
  content: faker.lorem.sentence(),
  author: `${faker.name.firstName()} ${faker.name.lastName()}`
});
