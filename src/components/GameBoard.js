import React, { forwardRef, useContext } from 'react';
import { GameStateContext } from './GameStateProvider';
import { Tile } from './Tile';

export const GameBoard = forwardRef(function GameBoard(props, ref) {
  const { board } = useContext(GameStateContext);

  return (
    <div className="game-board" ref={ref} {...props}>
      <div className="game-board__guesses">
        {board.map((guess, guessNumber) => (
          <div className="game-board__guess" key={`guess-${guessNumber}`}>
            {guess.map((tile, tileNumber) => {
              const { letter, evaluation } = board[guessNumber][tileNumber];

              return (
                <div
                  className="game-board__tile"
                  key={`tile-${guessNumber}-${tileNumber}`}
                >
                  <Tile letter={letter} evaluation={evaluation} />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
});
