import React, { forwardRef } from 'react';

export const NavBar = forwardRef(function NavBar(props, ref) {
  return (
    <header className="nav-bar" ref={ref}>
      <h1 className="nav-bar__title">Hello Wordle</h1>
    </header>
  );
});
