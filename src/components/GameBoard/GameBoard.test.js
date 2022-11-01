import React from 'react';
import cloneDeep from 'just-clone';
import { render, screen, getAllByTestId } from '@testing-library/react';
import { GameStateContext } from '../GameStateProvider';
import { initialGameState } from '../GameStateProvider/reducer';
import { GameBoard } from './GameBoard';
import { MESSAGES } from '../GameStateProvider/constants';

jest.useFakeTimers();

test('renders a grid of of 6 guesses each with 5 letter tiles', () => {
  const mockedContext = {
    ...cloneDeep(initialGameState),
  };

  render(
    <GameStateContext.Provider value={mockedContext}>
      <GameBoard />
    </GameStateContext.Provider>
  );

  const guesses = screen.getAllByTestId('guess');
  expect(guesses.length).toEqual(6);

  guesses.forEach((guess) => {
    expect(getAllByTestId(guess, 'tile').length).toEqual(5);
  });
});

test('marks a guess as invalid after it has been submited', () => {
  const mockedContext = {
    ...cloneDeep(initialGameState),
    cursor: [0, 0],
    lastGuess: { word: 'latrr', error: MESSAGES.NOT_IN_WORD_LIST },
  };

  render(
    <GameStateContext.Provider value={mockedContext}>
      <GameBoard />
    </GameStateContext.Provider>
  );

  expect(screen.getAllByTestId('guess')[0]).toHaveClass(
    'game-board__guess--invalid'
  );
});
