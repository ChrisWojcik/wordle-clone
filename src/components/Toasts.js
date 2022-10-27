import React, { useEffect, useContext, createRef, forwardRef } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
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
  const { toasts } = useContext(GameStateContext);

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
