import React, { useRef, useEffect, useState } from 'react';
import debounce from 'just-debounce-it';
import { GameStateProvider } from './components/GameStateProvider';
import { GameBoard } from './components/GameBoard';
import { Keyboard } from './components/Keyboard';
import { NavBar } from './components/NavBar';
import { Toasts } from './components/Toasts';
import {
  LETTERS_PER_WORD,
  NUM_GUESSES,
} from './components/GameStateProvider/constants';
import { clamp } from './util/clamp';

export function App() {
  const $navBar = useRef(null);
  const $gameBoard = useRef(null);
  const $keyboard = useRef(null);

  const [gameReady, setGameReady] = useState(false);

  useEffect(() => {
    const onResize = debounce(function onResize() {
      const GAME_BOARD_PADDING = 16;
      const TILE_GAP = 5;
      const MIN_TILE_SIZE = 32;
      const MAX_TILE_SIZE = 64;

      const availableHeight =
        window.innerHeight -
        GAME_BOARD_PADDING * 2 -
        $navBar.current.offsetHeight -
        $keyboard.current.offsetHeight;

      const tileSize = clamp(
        calculateTileSize(availableHeight, NUM_GUESSES, TILE_GAP),
        MIN_TILE_SIZE,
        MAX_TILE_SIZE
      );

      const boardWidth =
        tileSize * LETTERS_PER_WORD + TILE_GAP * (LETTERS_PER_WORD - 1);

      $gameBoard.current.style.setProperty(
        '--game-board-padding',
        GAME_BOARD_PADDING + 'px'
      );
      $gameBoard.current.style.setProperty(
        '--game-board-width',
        boardWidth + 'px'
      );
      $gameBoard.current.style.setProperty('--tile-size', tileSize + 'px');
      $gameBoard.current.style.setProperty('--tile-gap', TILE_GAP + 'px');

      setGameReady(true);

      function calculateTileSize(height, rows, gap) {
        return (height - (rows - 1) * gap) / rows;
      }
    }, 250);

    onResize();
    window.addEventListener('resize', onResize, false);

    return () => {
      window.removeEventListener('resize', onResize, false);
    };
  }, []);

  return (
    <GameStateProvider>
      <NavBar ref={$navBar} />
      <main>
        <GameBoard ref={$gameBoard} hidden={!gameReady} />
        <Keyboard ref={$keyboard} />
        <Toasts />
      </main>
    </GameStateProvider>
  );
}
