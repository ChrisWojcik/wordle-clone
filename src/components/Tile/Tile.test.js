import React from 'react';
import { render } from '@testing-library/react';
import { Tile } from './Tile';
import { CORRECT, PRESENT, ABSENT } from '../GameStateProvider/constants';

test('renders a blank tile by default', () => {
  const { container } = render(<Tile />);
  const tile = container.firstChild;

  expect(tile).toBeEmptyDOMElement();
});

test('renders a tile with the correct letter', () => {
  const { container } = render(<Tile letter="a" />);
  const tile = container.firstChild;

  expect(tile).toHaveTextContent('a');
});

test(`renders a tile with the ${CORRECT} state`, () => {
  const { container } = render(<Tile letter="a" evaluation={CORRECT} />);
  const tile = container.firstChild;

  expect(tile).toHaveClass(`tile--state-${CORRECT}`);
});

test(`renders a tile with the ${PRESENT} state`, () => {
  const { container } = render(<Tile letter="a" evaluation={PRESENT} />);
  const tile = container.firstChild;

  expect(tile).toHaveClass(`tile--state-${PRESENT}`);
});

test(`renders a tile with the ${ABSENT} state`, () => {
  const { container } = render(<Tile letter="a" evaluation={ABSENT} />);
  const tile = container.firstChild;

  expect(tile).toHaveClass(`tile--state-${ABSENT}`);
});
