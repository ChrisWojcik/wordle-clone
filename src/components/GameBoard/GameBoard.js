import React, { forwardRef, useContext, useRef, useEffect } from 'react';
import { GameStateContext } from '../GameStateProvider';
import { Tile } from '../Tile';

export const GameBoard = forwardRef(function GameBoard(props, ref) {
  const { board } = useContext(GameStateContext);

  return (
    <div className="game-board" ref={ref} {...props}>
      <div className="game-board__guesses">
        {board.map((guess, guessNumber) => (
          <Guess
            key={`guess-${guessNumber}`}
            number={guessNumber}
            tiles={guess}
          />
        ))}
      </div>
    </div>
  );
});

function Guess({ number, tiles }) {
  const isAnimating = useRef(false);
  const $ref = useRef(null);
  const { lastGuess, cursor } = useContext(GameStateContext);

  useEffect(() => {
    if (isAnimating.current) {
      return;
    }

    if (cursor[0] === number && lastGuess && lastGuess.error) {
      isAnimating.current = true;
      $ref.current.classList.add('game-board__guess--invalid');

      setTimeout(() => {
        $ref.current.classList.remove('game-board__guess--invalid');
        isAnimating.current = false;
      }, 500);
    }
  }, [lastGuess]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="game-board__guess" ref={$ref} data-testid="guess">
      {tiles.map((tile, tileNumber) => {
        const { letter, evaluation } = tile;

        return (
          <div
            className="game-board__tile"
            key={`tile-${number}-${tileNumber}`}
          >
            <Tile letter={letter} evaluation={evaluation} />
          </div>
        );
      })}
    </div>
  );
}
