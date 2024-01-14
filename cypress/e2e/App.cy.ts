describe('App', () => {
  it('attaches the extension to the first row when the game is new', () => {
    cy.visit('http://localhost:8100');

    cy.get('.Row-module_row__pwpBq').then((rows) => {
      const rowBoundingClientRect: DOMRect = rows.get(0).getBoundingClientRect();
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

    cy.get('.Row-module_row__pwpBq').then((rows: JQuery<HTMLElement>) => {
      const rowBoundingClientRect: DOMRect = rows.get(1).getBoundingClientRect();
      cy.get('start-button')
        .should('have.css', 'left', `${rowBoundingClientRect.right + 10}px`)
        .should('have.css', 'top', `${rowBoundingClientRect.top + 5}px`);

      cy.get('word-selector')
        .should('have.css', 'left', `${rowBoundingClientRect.right + 80}px`)
        .should('have.css', 'top', `${rowBoundingClientRect.top + 5}px`);
    });
  });

  it('opens the word selector when the start button is clicked', () => {
    cy.visit('http://localhost:8100');

    cy.get('start-button').click();

    cy.get('word-selector').should('be.visible');
  });

  it('closes the word selector when the start button is clicked again', () => {
    cy.visit('http://localhost:8100');

    cy.get('start-button').click();
    cy.get('start-button').click();

    cy.get('word-selector').should('not.be.visible');
  });

  it.only('inserts the selected word into the row when a word is selected', () => {
    cy.visit('http://localhost:8100');

    cy.get('start-button').click();
    cy.get('word-selector').should('be.visible');

    // TODO: figure out how to select the first word in the list. might need to access the shadow DOM
    cy.get('word-selector').find('.prediction-word').first().click();

    cy.get('.Row-module_row__pwpBq').then((rows) => {
        const row = rows.get(0);
        expect(row.textContent).to.equal('B');
    });
  });
});
