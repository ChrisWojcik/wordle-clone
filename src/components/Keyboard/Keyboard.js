import React, { forwardRef, useContext } from 'react';
import classNames from 'classnames';
import { GameStateContext } from '../GameStateProvider';
import { IconBackspace } from '../icons';

const keyboard = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
];

export const Keyboard = forwardRef(function Keyboard(props, ref) {
  const { letterEvaluations, typeLetter, backspace, submitGuess } =
    useContext(GameStateContext);

  return (
    <div className="keyboard" ref={ref}>
      {keyboard.map((row, index) => (
        <div className="keyboard__row" key={`row-${index}`}>
          {index === 2 && (
            <button
              className="keyboard__key keyboard__key--enter"
              type="button"
              onClick={() => submitGuess()}
            >
              Enter
            </button>
          )}
          {row.map((key) => (
            <button
              className={classNames(
                `keyboard__key`,
                `keyboard__key--state-${letterEvaluations[key] || 'default'}`
              )}
              type="button"
              key={key}
              onClick={() => typeLetter(key)}
            >
              {key}
            </button>
          ))}
          {index == 2 && (
            <button
              className="keyboard__key keyboard__key--backspace"
              type="button"
              onClick={() => backspace()}
              aria-label="Backspace"
            >
              <IconBackspace />
            </button>
          )}
        </div>
      ))}
    </div>
  );
});
