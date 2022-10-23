import React, { useReducer, useCallback, useMemo } from 'react';
import { TYPE_LETTER, BACKSPACE, SUBMIT_GUESS } from './actionTypes';
import { reducer, initialGameState } from './reducer';
import { GameStateContext } from './GameStateContext';

export function GameStateProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialGameState);

  const typeLetter = useCallback(
    (letter) => {
      dispatch({ type: TYPE_LETTER, data: { letter } });
    },
    [dispatch]
  );

  const backspace = useCallback(() => {
    dispatch({ type: BACKSPACE });
  }, [dispatch]);

  const submitGuess = useCallback(() => {
    dispatch({ type: SUBMIT_GUESS });
  }, [dispatch]);

  const contextValue = useMemo(() => {
    const { wordOfTheDay, board, cursor, letterEvaluations, status } = state;

    return {
      wordOfTheDay,
      board,
      cursor,
      letterEvaluations,
      status,
      typeLetter,
      backspace,
      submitGuess,
    };
  }, [state, typeLetter, backspace, submitGuess]);

  return (
    <GameStateContext.Provider value={contextValue}>
      {props.children}
    </GameStateContext.Provider>
  );
}
