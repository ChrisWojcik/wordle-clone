import React from 'react';
import classNames from 'classnames';

export function Tile({ letter, evaluation }) {
  const tileClasses = classNames(`tile`, {
    [`tile--state-${evaluation}`]: !!evaluation,
  });

  return (
    <div className={tileClasses} data-testid="tile">
      {letter}
    </div>
  );
}
