export function rot13(word = '', decode = false) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const cipher = 'nopqrstuvwxyzabcdefghijklmNOPQRSTUVWXYZABCDEFGHIJKLM';

  const from = decode ? cipher : alphabet;
  const to = decode ? alphabet : cipher;

  return word.replace(/[a-z]/gi, (letter) => from[to.indexOf(letter)]);
}
