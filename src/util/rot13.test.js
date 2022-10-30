import { rot13 } from './rot13';

test('encodes words by rotating each letter by 13 positions', () => {
  expect(rot13('armor')).toEqual('nezbe');
});

test('decodes words by applying the algorithm in reverse', () => {
  expect(rot13('nezbe', true)).toEqual('armor');
});

test('handles capital letters and ignores other characters', () => {
  expect(rot13('ArMoR ArMoR.')).toEqual('NeZbE NeZbE.');
  expect(rot13('NeZbE NeZbE.', true)).toEqual('ArMoR ArMoR.');
});

test('defaults the word to an empty string', () => {
  expect(rot13()).toEqual('');
});
