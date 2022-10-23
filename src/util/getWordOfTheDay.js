import wordsOfTheDayRot13 from '../words-of-the-day-rot13.json';
import { daysBetweenTwoDates } from './daysBetweenTwoDates';
import { rot13 } from './rot13';

const LAUNCH_DATE = new Date(2022, 9, 21, 0, 0, 0, 0);

export function getWordOfTheDay() {
  const index = Math.max(0, daysBetweenTwoDates(LAUNCH_DATE, new Date()));
  const encodedWord = wordsOfTheDayRot13[index % wordsOfTheDayRot13.length];

  return rot13(encodedWord, true);
}
