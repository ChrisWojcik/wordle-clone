import { createContext } from 'react';
import { initialGameState } from './reducer';

export const GameStateContext = createContext({
  ...initialGameState,
  typeLetter: () => {},
  backspace: () => {},
  submitGuess: () => {},
  removeToast: () => {},
});
