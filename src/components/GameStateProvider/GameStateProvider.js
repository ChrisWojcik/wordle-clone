import React, { useReducer, useCallback, useMemo } from 'react';
import * as actions from './actionCreators';
import { reducer, initialGameState } from './reducer';
import { GameStateContext } from './GameStateContext';

export function GameStateProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialGameState);

  const typeLetter = useCallback(
    (letter) => {
      dispatch(actions.typeLetter(letter));
    },
    [dispatch]
  );

  const backspace = useCallback(() => {
    dispatch(actions.backspace());
  }, [dispatch]);

  const submitGuess = useCallback(() => {
    dispatch(actions.submitGuess());
  }, [dispatch]);

  const removeToast = useCallback(
    (id) => {
      dispatch(actions.removeToast(id));
    },
    [dispatch]
  );

  const addToast = useCallback(
    (message, timeout) => {
      dispatch(actions.addToast(message, timeout));
    },
    [dispatch]
  );

  const contextValue = useMemo(() => {
    const {
      wordOfTheDay,
      board,
      cursor,
      letterEvaluations,
      status,
      lastGuess,
      toasts,
    } = state;

    return {
      wordOfTheDay,
      board,
      cursor,
      letterEvaluations,
      status,
      lastGuess,
      toasts,
      typeLetter,
      backspace,
      submitGuess,
      removeToast,
      addToast,
    };
  }, [state, typeLetter, backspace, submitGuess, removeToast, addToast]);

  return (
    <GameStateContext.Provider value={contextValue}>
      {props.children}
    </GameStateContext.Provider>
  );
}
