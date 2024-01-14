describe('App', () => {
  it('attaches the extension to the first row when the game is new', () => {
    cy.visit('http://localhost:8100');

    cy.get('.Row-module_row__pwpBq').then((rows) => {
      const rowBoundingClientRect = rows.get(0).getBoundingClientRect();
      cy.get('start-button')
        .should('have.css', 'left', `${rowBoundingClientRect.right + 10}px`)
        .should('have.css', 'top', `${rowBoundingClientRect.top + 5}px`);

      cy.get('word-selector')
        .should('have.css', 'left', `${rowBoundingClientRect.right + 80}px`)
        .should('have.css', 'top', `${rowBoundingClientRect.top + 5}px`);
    });
  });


  it('attaches the extension to the empty row when the game is in progress', () => {
    cy.visit('http://localhost:8100/in_progress.html');

    // assert that the start button exists
    cy.get('.Row-module_row__pwpBq').then((rows) => {
      const rowBoundingClientRect = rows.get(1).getBoundingClientRect();
      cy.get('start-button')
        .should('have.css', 'left', `${rowBoundingClientRect.right + 10}px`)
        .should('have.css', 'top', `${rowBoundingClientRect.top + 5}px`);

      cy.get('word-selector')
        .should('have.css', 'left', `${rowBoundingClientRect.right + 80}px`)
        .should('have.css', 'top', `${rowBoundingClientRect.top + 5}px`);
    });
  });});
