describe('App', () => {
  beforeEach(() => {
    // set to the launch date
    const now = new Date(2022, 9, 21, 0, 0, 0, 0).getTime();
    cy.clock(now, ['Date']);
  });

  it('should allow a user to win a game', () => {
    cy.visit('/');

    // guess 1
    cy.findByRole('button', { name: 'l' }).click();
    cy.findAllByTestId('tile').eq(0).should('have.text', 'l');

    cy.findByRole('button', { name: 'a' }).click();
    cy.findAllByTestId('tile').eq(1).should('have.text', 'a');

    cy.findByRole('button', { name: 't' }).click();
    cy.findAllByTestId('tile').eq(2).should('have.text', 't');

    cy.findByRole('button', { name: 'e' }).click();
    cy.findAllByTestId('tile').eq(3).should('have.text', 'e');

    cy.findByRole('button', { name: 'r' }).click();
    cy.findAllByTestId('tile').eq(4).should('have.text', 'r');

    cy.findByRole('button', { name: /Enter/i }).click();
    cy.tick(2000);

    // guess 2
    cy.findByRole('button', { name: 'b' }).click();
    cy.findAllByTestId('tile').eq(5).should('have.text', 'b');

    cy.findByRole('button', { name: 'r' }).click();
    cy.findAllByTestId('tile').eq(6).should('have.text', 'r');

    cy.findByRole('button', { name: 'a' }).click();
    cy.findAllByTestId('tile').eq(7).should('have.text', 'a');

    cy.findByRole('button', { name: 'i' }).click();
    cy.findAllByTestId('tile').eq(8).should('have.text', 'i');

    cy.findByRole('button', { name: 'n' }).click();
    cy.findAllByTestId('tile').eq(9).should('have.text', 'n');

    cy.findByRole('button', { name: /Enter/i }).click();
    cy.tick(2000);
    cy.findByText('Magnificent').should('exist');
    cy.tick(2000);
    cy.findByText('Magnificent').should('not.exist');
  });

  it('should allow a user to lose a game', () => {
    cy.visit('/');

    // guess 1
    cy.findByRole('button', { name: 'l' }).click();
    cy.findAllByTestId('tile').eq(0).should('have.text', 'l');

    cy.findByRole('button', { name: 'a' }).click();
    cy.findAllByTestId('tile').eq(1).should('have.text', 'a');

    cy.findByRole('button', { name: 't' }).click();
    cy.findAllByTestId('tile').eq(2).should('have.text', 't');

    cy.findByRole('button', { name: 'e' }).click();
    cy.findAllByTestId('tile').eq(3).should('have.text', 'e');

    cy.findByRole('button', { name: 'r' }).click();
    cy.findAllByTestId('tile').eq(4).should('have.text', 'r');

    cy.findByRole('button', { name: /Enter/i }).click();
    cy.tick(2000);

    // guess 2
    cy.findByRole('button', { name: 'p' }).click();
    cy.findAllByTestId('tile').eq(5).should('have.text', 'p');

    cy.findByRole('button', { name: 'l' }).click();
    cy.findAllByTestId('tile').eq(6).should('have.text', 'l');

    cy.findByRole('button', { name: 'a' }).click();
    cy.findAllByTestId('tile').eq(7).should('have.text', 'a');

    cy.findByRole('button', { name: 'n' }).click();
    cy.findAllByTestId('tile').eq(8).should('have.text', 'n');

    cy.findByRole('button', { name: 'e' }).click();
    cy.findAllByTestId('tile').eq(9).should('have.text', 'e');

    cy.findByRole('button', { name: /Enter/i }).click();
    cy.tick(2000);

    // guess 3
    cy.findByRole('button', { name: 'c' }).click();
    cy.findAllByTestId('tile').eq(10).should('have.text', 'c');

    cy.findByRole('button', { name: 'o' }).click();
    cy.findAllByTestId('tile').eq(11).should('have.text', 'o');

    cy.findByRole('button', { name: 'i' }).click();
    cy.findAllByTestId('tile').eq(12).should('have.text', 'i');

    cy.findByRole('button', { name: 'n' }).click();
    cy.findAllByTestId('tile').eq(13).should('have.text', 'n');

    cy.findByRole('button', { name: 's' }).click();
    cy.findAllByTestId('tile').eq(14).should('have.text', 's');

    cy.findByRole('button', { name: /Enter/i }).click();
    cy.tick(2000);

    // guess 4
    cy.findByRole('button', { name: 'b' }).click();
    cy.findAllByTestId('tile').eq(15).should('have.text', 'b');

    cy.findByRole('button', { name: 'u' }).click();
    cy.findAllByTestId('tile').eq(16).should('have.text', 'u');

    cy.findByRole('button', { name: 'm' }).click();
    cy.findAllByTestId('tile').eq(17).should('have.text', 'm');

    cy.findByRole('button', { name: 'p' }).click();
    cy.findAllByTestId('tile').eq(18).should('have.text', 'p');

    cy.findByRole('button', { name: 'y' }).click();
    cy.findAllByTestId('tile').eq(19).should('have.text', 'y');

    cy.findByRole('button', { name: /Enter/i }).click();
    cy.tick(2000);

    // guess 5
    cy.findByRole('button', { name: 'c' }).click();
    cy.findAllByTestId('tile').eq(20).should('have.text', 'c');

    cy.findByRole('button', { name: 'r' }).click();
    cy.findAllByTestId('tile').eq(21).should('have.text', 'r');

    cy.findByRole('button', { name: 'a' }).click();
    cy.findAllByTestId('tile').eq(22).should('have.text', 'a');

    cy.findByRole('button', { name: 't' }).click();
    cy.findAllByTestId('tile').eq(23).should('have.text', 't');

    cy.findByRole('button', { name: 'e' }).click();
    cy.findAllByTestId('tile').eq(24).should('have.text', 'e');

    cy.findByRole('button', { name: /Enter/i }).click();
    cy.tick(2000);

    // guess 6
    cy.findByRole('button', { name: 'p' }).click();
    cy.findAllByTestId('tile').eq(25).should('have.text', 'p');

    cy.findByRole('button', { name: 'l' }).click();
    cy.findAllByTestId('tile').eq(26).should('have.text', 'l');

    cy.findByRole('button', { name: 'a' }).click();
    cy.findAllByTestId('tile').eq(27).should('have.text', 'a');

    cy.findByRole('button', { name: 'i' }).click();
    cy.findAllByTestId('tile').eq(28).should('have.text', 'i');

    cy.findByRole('button', { name: 'd' }).click();
    cy.findAllByTestId('tile').eq(29).should('have.text', 'd');

    cy.findByRole('button', { name: /Enter/i }).click();
    cy.tick(2000);
    cy.findByText('BRAIN').should('exist');
  });
});
