import { getWordOfTheDay } from './getWordOfTheDay';

jest.mock('../words-of-the-day-rot13.json', () => ['purrx', 'nezbe', 'grfgl']);

beforeAll(() => {
  jest.useFakeTimers('modern');
  jest.setSystemTime(new Date(2022, 9, 21, 0, 0, 0, 0));
});

afterAll(() => {
  jest.useRealTimers();
});

test('returns the correct word from the dictionary based on the start date', () => {
  expect(getWordOfTheDay()).toEqual('cheek');

  jest.setSystemTime(new Date(2022, 9, 22, 0, 0, 0, 0));
  expect(getWordOfTheDay()).toEqual('armor');

  jest.setSystemTime(new Date(2022, 9, 23, 0, 0, 0, 0));
  expect(getWordOfTheDay()).toEqual('testy');
});

test('wraps around after going through the entire list', () => {
  jest.setSystemTime(new Date(2022, 9, 24, 0, 0, 0, 0));
  expect(getWordOfTheDay()).toEqual('cheek');
});
