import cloneDeep from 'just-clone';
import { reducer, initialGameState } from './reducer';
import {
  WON,
  LOST,
  PENDING,
  CORRECT,
  PRESENT,
  ABSENT,
  MESSAGES,
} from './constants';
import {
  ADD_TOAST,
  BACKSPACE,
  REMOVE_TOAST,
  SUBMIT_GUESS,
  TYPE_LETTER,
} from './actionTypes';
import {
  typeLetter,
  backspace,
  submitGuess,
  addToast,
  removeToast,
} from './actionCreators';

jest.mock('../../util/getWordOfTheDay');

test('ignores unrecognized actions', () => {
  const state = { ...cloneDeep(initialGameState) };

  expect(reducer(state, { type: 'NOT_AN_ACTION' })).toEqual(state);
});

describe(TYPE_LETTER, () => {
  test('adds letters to the current guess and moves the cursor', () => {
    const state = reducer({ ...cloneDeep(initialGameState) }, typeLetter('l'));

    expect(state.board[0][0]).toEqual({ letter: 'l', evaluation: PENDING });
    expect(state.cursor).toEqual([0, 1]);
  });

  test('does not allow you to type a letter if the game is over', () => {
    const state = { ...cloneDeep(initialGameState), status: WON };
    const action = typeLetter('l');

    expect(reducer(state, action)).toEqual(state);

    state.status = LOST;
    expect(reducer(state, action)).toEqual(state);
  });

  test('does not allow you to type more than 5 letters per word', () => {
    let state = cloneDeep(initialGameState);

    state = reducer(state, typeLetter('l'));
    state = reducer(state, typeLetter('a'));
    state = reducer(state, typeLetter('t'));
    state = reducer(state, typeLetter('e'));
    state = reducer(state, typeLetter('r'));

    expect(reducer(state, typeLetter('x'))).toEqual(state);
  });
});

describe(BACKSPACE, () => {
  test('removes the most recently typed letter and moves the cursor back one space', () => {
    let state = cloneDeep(initialGameState);

    state = reducer(state, typeLetter('l'));
    state = reducer(state, typeLetter('a'));
    state = reducer(state, backspace());

    expect(state.cursor).toEqual([0, 1]);
    expect(state.board[0][1]).toEqual({ letter: null, evaluation: null });
  });

  test('does nothing if the game is over', () => {
    let state = cloneDeep(initialGameState);

    state = reducer(state, typeLetter('l'));
    state.status = WON;

    expect(reducer(state, backspace())).toEqual(state);

    state.status = LOST;
    expect(reducer(state, backspace())).toEqual(state);
  });

  test('does nothing if there are no letters in your current guess', () => {
    const state = cloneDeep(initialGameState);

    expect(reducer(state, backspace())).toEqual(state);
  });
});

describe(SUBMIT_GUESS, () => {
  const guessAndSubmit = (state, word) => {
    let s = cloneDeep(state);
    const letters = word.split('');

    letters.forEach((letter) => {
      s = reducer(s, typeLetter(letter));
    });

    return reducer(s, submitGuess());
  };

  const getTileEvaluationsForLastGuess = (state) => {
    const guessNumber = state.cursor[0] - 1;

    if (guessNumber < 0) {
      return [];
    }

    return state.board[guessNumber].map((tile) => tile.evaluation);
  };

  test('wins the game if a guess matches the word of the day', () => {
    let state = { ...cloneDeep(initialGameState), wordOfTheDay: 'later' };

    state = guessAndSubmit(state, 'plant');
    state = guessAndSubmit(state, 'later');

    expect(state.status).toEqual(WON);
    expect(reducer(state, submitGuess())).toEqual(state);
  });

  test('loses the game if you submit 6 incorrect guesses', () => {
    let state = { ...cloneDeep(initialGameState), wordOfTheDay: 'later' };

    state = guessAndSubmit(state, 'plane');
    state = guessAndSubmit(state, 'coins');
    state = guessAndSubmit(state, 'bumpy');
    state = guessAndSubmit(state, 'crate');
    state = guessAndSubmit(state, 'paint');
    state = guessAndSubmit(state, 'shade');

    expect(state.status).toEqual(LOST);
    expect(reducer(state, submitGuess())).toEqual(state);
  });

  test("warns the user if there weren't enough letters in the guess", () => {
    let state = { ...cloneDeep(initialGameState), wordOfTheDay: 'later' };

    state = guessAndSubmit(state, 'lat');

    expect(state.cursor).toEqual([0, 3]);
    expect(state.lastGuess).toEqual({
      word: 'lat',
      error: MESSAGES.NOT_ENOUGH_LETTERS,
    });
  });

  test('warns the user if the guess was not in the word list', () => {
    let state = { ...cloneDeep(initialGameState), wordOfTheDay: 'later' };

    state = guessAndSubmit(state, 'latrr');

    expect(state.cursor).toEqual([0, 5]);
    expect(state.lastGuess).toEqual({
      word: 'latrr',
      error: MESSAGES.NOT_IN_WORD_LIST,
    });
  });

  test('correctly evaluates letters in the guessed word', () => {
    let state = { ...cloneDeep(initialGameState), wordOfTheDay: 'abbey' };

    state = guessAndSubmit(state, 'babes');

    expect(getTileEvaluationsForLastGuess(state)).toEqual([
      PRESENT,
      PRESENT,
      CORRECT,
      CORRECT,
      ABSENT,
    ]);

    expect(state.letterEvaluations['b']).toEqual(CORRECT);
    expect(state.letterEvaluations['a']).toEqual(PRESENT);
    expect(state.letterEvaluations['e']).toEqual(CORRECT);
    expect(state.letterEvaluations['s']).toEqual(ABSENT);
    expect(state.letterEvaluations['y']).toBeUndefined();

    state = guessAndSubmit(state, 'kebab');

    expect(getTileEvaluationsForLastGuess(state)).toEqual([
      ABSENT,
      PRESENT,
      CORRECT,
      PRESENT,
      PRESENT,
    ]);

    expect(state.letterEvaluations['b']).toEqual(CORRECT);
    expect(state.letterEvaluations['a']).toEqual(PRESENT);
    expect(state.letterEvaluations['e']).toEqual(CORRECT);
    expect(state.letterEvaluations['s']).toEqual(ABSENT);
    expect(state.letterEvaluations['y']).toBeUndefined();
    expect(state.letterEvaluations['k']).toEqual(ABSENT);

    state = guessAndSubmit(state, 'abyss');

    expect(getTileEvaluationsForLastGuess(state)).toEqual([
      CORRECT,
      CORRECT,
      PRESENT,
      ABSENT,
      ABSENT,
    ]);

    expect(state.letterEvaluations['b']).toEqual(CORRECT);
    expect(state.letterEvaluations['a']).toEqual(CORRECT);
    expect(state.letterEvaluations['e']).toEqual(CORRECT);
    expect(state.letterEvaluations['s']).toEqual(ABSENT);
    expect(state.letterEvaluations['y']).toEqual(PRESENT);
    expect(state.letterEvaluations['k']).toEqual(ABSENT);

    state = guessAndSubmit(state, 'opens');

    expect(getTileEvaluationsForLastGuess(state)).toEqual([
      ABSENT,
      ABSENT,
      PRESENT,
      ABSENT,
      ABSENT,
    ]);

    expect(state.letterEvaluations['b']).toEqual(CORRECT);
    expect(state.letterEvaluations['a']).toEqual(CORRECT);
    expect(state.letterEvaluations['e']).toEqual(CORRECT);
    expect(state.letterEvaluations['s']).toEqual(ABSENT);
    expect(state.letterEvaluations['y']).toEqual(PRESENT);
    expect(state.letterEvaluations['k']).toEqual(ABSENT);

    state = { ...cloneDeep(initialGameState), wordOfTheDay: 'mealy' };
    state = guessAndSubmit(state, 'later');
    state = guessAndSubmit(state, 'plane');
    state = guessAndSubmit(state, 'eagle');

    expect(state.letterEvaluations['e']).toEqual(PRESENT);
    expect(state.letterEvaluations['r']).toEqual(ABSENT);
    expect(state.letterEvaluations['t']).toEqual(ABSENT);
    expect(state.letterEvaluations['p']).toEqual(ABSENT);
    expect(state.letterEvaluations['a']).toEqual(CORRECT);
    expect(state.letterEvaluations['g']).toEqual(ABSENT);
    expect(state.letterEvaluations['l']).toEqual(CORRECT);
    expect(state.letterEvaluations['n']).toEqual(ABSENT);

    state = { ...cloneDeep(initialGameState), wordOfTheDay: 'those' };
    state = guessAndSubmit(state, 'geese');

    expect(getTileEvaluationsForLastGuess(state)).toEqual([
      ABSENT,
      ABSENT,
      ABSENT,
      CORRECT,
      CORRECT,
    ]);

    state = { ...cloneDeep(initialGameState), wordOfTheDay: 'dread' };
    state = guessAndSubmit(state, 'added');

    expect(getTileEvaluationsForLastGuess(state)).toEqual([
      PRESENT,
      PRESENT,
      ABSENT,
      PRESENT,
      CORRECT,
    ]);
  });

  describe(ADD_TOAST, () => {
    test('adds toasts to the beginning of the list', () => {
      let state = { ...cloneDeep(initialGameState) };

      state = reducer(state, addToast('Not enough letters'));
      expect(state.toasts).toHaveLength(1);
      expect(state.toasts[0].message).toEqual('Not enough letters');

      state = reducer(state, addToast('Not in word list'));
      expect(state.toasts).toHaveLength(2);
      expect(state.toasts[0].message).toEqual('Not in word list');
    });
  });

  describe(REMOVE_TOAST, () => {
    test('removes toasts by id', () => {
      let state = { ...cloneDeep(initialGameState) };

      state = reducer(state, addToast('Not enough letters'));
      state = reducer(state, addToast('Not in word list'));
      state = reducer(state, addToast('Not enough letters'));

      expect(state.toasts).toHaveLength(3);

      state = reducer(state, removeToast(state.toasts[0].id));
      expect(state.toasts).toHaveLength(2);
      expect(state.toasts[0].message).toEqual('Not in word list');

      state = reducer(state, removeToast(state.toasts[1].id));
      expect(state.toasts).toHaveLength(1);
      expect(state.toasts[0].message).toEqual('Not in word list');
    });
  });
});
