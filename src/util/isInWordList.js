import dictionary from '../dictionary.json';

export function isInWordList(word) {
  return dictionary.indexOf(word) !== -1;
}
