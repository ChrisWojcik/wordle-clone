import {
  TYPE_LETTER,
  BACKSPACE,
  SUBMIT_GUESS,
  REMOVE_TOAST,
} from './actionTypes';
import {
  NUM_GUESSES,
  LETTERS_PER_WORD,
  PENDING,
  ABSENT,
  CORRECT,
  PRESENT,
  IN_PROGRESS,
  WON,
  LOST,
} from './constants';
import { getWordOfTheDay } from '../../util/getWordOfTheDay';
import { isInWordList } from '../../util/isInWordList';

const alphabet = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

export const initialGameState = {
  wordOfTheDay: getWordOfTheDay(),
  board: initializeBoard(NUM_GUESSES, LETTERS_PER_WORD),
  cursor: [0, 0],
  letterEvaluations: alphabet.reduce(
    (result, letter) => ({ ...result, [letter]: undefined }),
    {}
  ),
  toasts: [],
  status: IN_PROGRESS,
};

export function reducer(state, action) {
  switch (action.type) {
    case TYPE_LETTER:
      return handleTypeLetter(state, action);
    case BACKSPACE:
      return handleBackspace(state, action);
    case SUBMIT_GUESS:
      return handleSubmitGuess(state, action);
    case REMOVE_TOAST:
      return handleRemoveToast(state, action);
    default:
      return state;
  }
}

export function handleTypeLetter(state, action) {
  const { letter } = action.data;
  const { board, cursor, status } = state;
  const [guessNumber, tileNumber] = cursor;

  if (status !== IN_PROGRESS) {
    return state;
  }

  if (tileNumber < LETTERS_PER_WORD) {
    const tile = board[guessNumber][tileNumber];

    const updatedTile = {
      ...tile,
      letter,
      evaluation: PENDING,
    };

    board[guessNumber][tileNumber] = updatedTile;
    const updatedCursor = [guessNumber, tileNumber + 1];

    return {
      ...state,
      board,
      cursor: updatedCursor,
    };
  }

  return state;
}

export function handleBackspace(state) {
  const { board, cursor, status } = state;
  const [guessNumber, tileNumber] = cursor;

  if (status !== IN_PROGRESS) {
    return state;
  }

  if (tileNumber > 0) {
    const previousLetter = tileNumber - 1;
    const tile = board[guessNumber][previousLetter];

    const updatedTile = {
      ...tile,
      letter: null,
      evaluation: null,
    };

    board[guessNumber][previousLetter] = updatedTile;
    const updatedCursor = [guessNumber, previousLetter];

    return {
      ...state,
      board,
      cursor: updatedCursor,
    };
  }

  return state;
}

export function handleSubmitGuess(state) {
  const { board, cursor, letterEvaluations, status, wordOfTheDay, toasts } =
    state;
  const [guessNumber, tileNumber] = cursor;

  if (status !== IN_PROGRESS) {
    return state;
  }

  if (tileNumber < LETTERS_PER_WORD) {
    return {
      ...state,
      toasts: [createToast('Not enough letters'), ...toasts],
    };
  }

  if (tileNumber === LETTERS_PER_WORD) {
    const guessedWord = board[guessNumber].map((tile) => tile.letter).join('');

    if (!isInWordList(guessedWord)) {
      return {
        ...state,
        toasts: [createToast('Not in word list'), ...toasts],
      };
    }

    const tileEvaluations = getTileEvaluations(guessedWord, wordOfTheDay);

    board[guessNumber] = board[guessNumber].map((tile, index) => ({
      ...tile,
      evaluation: tileEvaluations[index],
    }));

    const updatedCursor = [guessNumber + 1, 0];

    board[guessNumber].forEach(({ letter }, index) => {
      if (letterEvaluations[letter] === CORRECT) {
        return;
      }

      const evaluationOfTile = tileEvaluations[index];
      letterEvaluations[letter] = evaluationOfTile;
    });

    let updatedStatus = status;
    let updatedToasts = toasts;

    if (guessedWord === wordOfTheDay) {
      const winMessages = [
        'Genius',
        'Magnificent',
        'Impressive',
        'Splendid',
        'Great',
        'Phew',
      ];

      updatedToasts = [createToast(winMessages[guessNumber], 2000), ...toasts];
      updatedStatus = WON;
    }

    if (updatedCursor[0] === NUM_GUESSES && guessedWord !== wordOfTheDay) {
      updatedToasts = [createToast(wordOfTheDay.toUpperCase(), -1), ...toasts];
      updatedStatus = LOST;
    }

    return {
      ...state,
      board,
      cursor: updatedCursor,
      status: updatedStatus,
      toasts: updatedToasts,
    };
  }

  return state;
}

function handleRemoveToast(state, action) {
  const { id } = action.data;

  return {
    ...state,
    toasts: state.toasts.filter((toast) => toast.id !== id),
  };
}

function initializeBoard(numGuesses, lettersPerWord) {
  const board = [];

  for (let guessNumber = 0; guessNumber < numGuesses; guessNumber++) {
    const guess = [];

    for (let tileNumber = 0; tileNumber < lettersPerWord; tileNumber++) {
      guess.push({ letter: null, evaluation: null });
    }

    board.push(guess);
  }

  return board;
}

function getTileEvaluations(guess, answer) {
  const tiles = guess.split('');
  const tileEvaluations = tiles.map(() => ABSENT);

  tiles.forEach((letter, index) => {
    if (answer[index] === letter) {
      tileEvaluations[index] = CORRECT;
      answer = answer.replace(letter, ' ');
    }
  });

  tiles.forEach((letter, index) => {
    if (tileEvaluations[index] !== CORRECT && answer.indexOf(letter) !== -1) {
      tileEvaluations[index] = PRESENT;
      answer = answer.replace(letter, ' ');
    }
  });

  return tileEvaluations;
}

const AUTOHIDE_TIMEOUT = 1000;
let toastUid = 0;

function createToast(message, timeout = AUTOHIDE_TIMEOUT) {
  return { message, id: toastUid++, timeout };
}
