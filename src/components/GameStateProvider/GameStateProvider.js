import React, { useReducer, useEffect, useCallback, useMemo } from 'react';
import * as actions from './actionCreators';
import { reducer, initialGameState } from './reducer';
import { GameStateContext } from './GameStateContext';
import { WON, LOST, MESSAGES } from './constants';

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

  useEffect(() => {
    const ANIMATION_DELAY = 2000;

    if (state.status === WON) {
      setTimeout(() => {
        addToast(MESSAGES.WIN[state.cursor[0] - 1], 1500);
      }, ANIMATION_DELAY);
    }

    if (state.status === LOST) {
      setTimeout(() => {
        addToast(state.wordOfTheDay.toUpperCase(), -1);
      }, ANIMATION_DELAY);
    }
  }, [state.status, addToast]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (state.lastGuess && state.lastGuess.error) {
      addToast(state.lastGuess.error);
    }
  }, [state.lastGuess, addToast]);

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
