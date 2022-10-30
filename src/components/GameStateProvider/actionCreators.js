import {
  BACKSPACE,
  TYPE_LETTER,
  SUBMIT_GUESS,
  REMOVE_TOAST,
  ADD_TOAST,
} from './actionTypes';

export const typeLetter = (letter) => ({ type: TYPE_LETTER, data: { letter } });

export const backspace = () => ({ type: BACKSPACE });

export const submitGuess = () => ({ type: SUBMIT_GUESS });

export const removeToast = (id) => ({ type: REMOVE_TOAST, data: { id } });

export const addToast = (message, timeout) => ({
  type: ADD_TOAST,
  data: { message, timeout },
});
