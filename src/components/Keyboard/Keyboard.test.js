import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GameStateContext } from '../GameStateProvider';
import {
  ALPHABET,
  PRESENT,
  ABSENT,
  CORRECT,
} from '../GameStateProvider/constants';
import { Keyboard } from './Keyboard';

test('types a letter when a letter key is pressed', async () => {
  const user = userEvent.setup();

  const mockedContext = {
    typeLetter: jest.fn(),
    submitGuess: jest.fn(),
    backspace: jest.fn(),
    letterEvaluations: ALPHABET.reduce(
      (result, letter) => ({ ...result, [letter]: undefined }),
      {}
    ),
  };

  render(
    <GameStateContext.Provider value={mockedContext}>
      <Keyboard />
    </GameStateContext.Provider>
  );

  await user.click(screen.getByText('a'));
  expect(mockedContext.typeLetter).toHaveBeenCalledTimes(1);
  expect(mockedContext.typeLetter).toHaveBeenCalledWith('a');
});

test('submits a guess when key is pressed', async () => {
  const user = userEvent.setup();

  const mockedContext = {
    typeLetter: jest.fn(),
    submitGuess: jest.fn(),
    backspace: jest.fn(),
    letterEvaluations: ALPHABET.reduce(
      (result, letter) => ({ ...result, [letter]: undefined }),
      {}
    ),
  };

  render(
    <GameStateContext.Provider value={mockedContext}>
      <Keyboard />
    </GameStateContext.Provider>
  );

  await user.click(screen.getByText('Enter'));
  expect(mockedContext.submitGuess).toHaveBeenCalledTimes(1);
});

test('removes a letter when the backspace key is pressed', async () => {
  const user = userEvent.setup();

  const mockedContext = {
    typeLetter: jest.fn(),
    submitGuess: jest.fn(),
    backspace: jest.fn(),
    letterEvaluations: ALPHABET.reduce(
      (result, letter) => ({ ...result, [letter]: undefined }),
      {}
    ),
  };

  render(
    <GameStateContext.Provider value={mockedContext}>
      <Keyboard />
    </GameStateContext.Provider>
  );

  await user.click(screen.getByLabelText('Backspace'));
  expect(mockedContext.backspace).toHaveBeenCalledTimes(1);
});

test('displays the letter keys with their evaluated state', () => {
  const mockedContext = {
    typeLetter: jest.fn(),
    submitGuess: jest.fn(),
    backspace: jest.fn(),
    letterEvaluations: ALPHABET.reduce(
      (result, letter) => ({ ...result, [letter]: undefined }),
      {}
    ),
  };

  mockedContext.letterEvaluations['a'] = CORRECT;
  mockedContext.letterEvaluations['b'] = PRESENT;
  mockedContext.letterEvaluations['c'] = ABSENT;

  render(
    <GameStateContext.Provider value={mockedContext}>
      <Keyboard />
    </GameStateContext.Provider>
  );

  expect(screen.getByText('a')).toHaveClass(`keyboard__key--state-${CORRECT}`);
  expect(screen.getByText('b')).toHaveClass(`keyboard__key--state-${PRESENT}`);
  expect(screen.getByText('c')).toHaveClass(`keyboard__key--state-${ABSENT}`);
});
