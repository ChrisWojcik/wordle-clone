import React, { useEffect, useContext, createRef, forwardRef } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { WON, LOST } from './GameStateProvider/constants';
import { GameStateContext } from './GameStateProvider';

const Toast = forwardRef(function Toast({ message, id, timeout }, ref) {
  const { removeToast } = useContext(GameStateContext);

  useEffect(() => {
    if (timeout >= 0) {
      setTimeout(() => {
        removeToast(id);
      }, timeout);
    }
  }, [removeToast, id, timeout]);

  return (
    <div ref={ref} className="toast" id={`toast-${id}`}>
      {message}
    </div>
  );
});

export function Toasts() {
  const { toasts, addToast, status, cursor, wordOfTheDay } =
    useContext(GameStateContext);

  useEffect(() => {
    const winMessages = [
      'Genius',
      'Magnificent',
      'Impressive',
      'Splendid',
      'Great',
      'Phew',
    ];

    const ANIMATION_DELAY = 2000;

    if (status === WON) {
      setTimeout(() => {
        addToast(winMessages[cursor[0] - 1], 1500);
      }, ANIMATION_DELAY);
    }

    if (status === LOST) {
      setTimeout(() => {
        addToast(wordOfTheDay.toUpperCase(), -1);
      }, ANIMATION_DELAY);
    }
  }, [status]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <TransitionGroup className="toasts" component="div">
      {toasts.map((toast) => {
        const nodeRef = createRef(null);

        return (
          <CSSTransition
            key={toast.id}
            nodeRef={nodeRef}
            classNames="toast-"
            timeout={300}
          >
            <Toast key={toast.id} ref={nodeRef} {...toast} />
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
}
