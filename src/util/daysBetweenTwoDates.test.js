import { daysBetweenTwoDates } from './daysBetweenTwoDates';

test('returns the correct number of days between two dates', () => {
  const today = new Date(2022, 9, 21, 23, 59, 59, 0);
  expect(daysBetweenTwoDates(today, today)).toEqual(0);

  const tomorrow = new Date(2022, 9, 22, 0, 0, 0, 1);
  expect(daysBetweenTwoDates(today, tomorrow)).toEqual(1);

  const twoDaysFromNow = new Date(2022, 9, 23, 12, 0, 0, 0);
  expect(daysBetweenTwoDates(today, twoDaysFromNow)).toEqual(2);

  const feb28ThisYear = new Date(2022, 1, 28, 0, 0, 0, 0);
  const mar1AfterLeapYear = new Date(2024, 2, 1, 0, 0, 0, 0);
  expect(daysBetweenTwoDates(feb28ThisYear, mar1AfterLeapYear)).toEqual(732);

  const jan1ThisYear = new Date(2022, 0, 1, 0, 0, 0, 0);
  const jan1LastYear = new Date(2021, 0, 1, 0, 0, 0, 0);
  expect(daysBetweenTwoDates(jan1ThisYear, jan1LastYear)).toEqual(-365);
});
