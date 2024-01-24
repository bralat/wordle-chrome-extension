describe('App', () => {
  const goHome = () => {
    cy.visit('https://www.nytimes.com/games/wordle/index.html');

    // if welcome module is loaded. click play button
    cy.get('.Welcome-module_contentWelcome__TL17B').then((welcomeModuleElement: JQuery<HTMLElement>) => {
      if (welcomeModuleElement.length > 0) {
        cy
          .get('.Welcome-module_button__ZG0Zh[data-testid="Play"]')
          .then(button => {
            cy.wrap(button).click()
          });
      }

      // if help dialog is loaded. close it
      cy.get('dialog#help-dialog').then((modalElement: JQuery<HTMLElement>) => {
        if (modalElement.length > 0) {
          cy.get('.Modal-module_closeIcon__TcEKb').click();
        }
      });
    });

    cy.wait(2000);
  }

  beforeEach(() => {
    goHome()
  })

  it('attaches the extension to the first row when the game is new', () => {
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
    cy.get('body')
      .trigger('keydown', { key: 'a' })
      .trigger('keydown', { key: 'd' })
      .trigger('keydown', { key: 'i' })
      .trigger('keydown', { key: 'e' })
      .trigger('keydown', { key: 'u' });

    cy.get('button[data-key="↵"]').click();

    cy.wait(2000);

    cy.get('.Row-module_row__pwpBq').then((rows: JQuery<HTMLElement>) => {
      const rowBoundingClientRect: DOMRect = rows.get(1).getBoundingClientRect();
      cy.get('start-button')
        .should('have.css', 'left', `${rowBoundingClientRect.right + 10}px`)
        .should('have.css', 'top', `${Number((rowBoundingClientRect.top + 5).toFixed(3))}px`);

      cy.get('word-selector')
        .should('have.css', 'left', `${rowBoundingClientRect.right + 80}px`)
        .should('have.css', 'top', `${Number((rowBoundingClientRect.top + 5).toFixed(3))}px`);
    });
  });

  it('opens the word selector when the start button is clicked', () => {
    cy.get('start-button').click();

    cy.get('word-selector').should('be.visible');
  });

  it('closes the word selector when the start button is clicked again', () => {
    cy.get('start-button').click();
    cy.get('start-button').click();

    cy.get('word-selector').should('not.be.visible');
  });

  it('inserts the selected word into the row when a word is selected', () => {
    cy.get('start-button').click();
    cy.get('word-selector').should('be.visible');

    cy.get('word-selector').then((element: JQuery<HTMLElement>) => {
      const shadowRoot = element[0].shadowRoot;
      const wordWrapper = shadowRoot.querySelector('.prediction');
      const word = wordWrapper.querySelector('.prediction-word').textContent;
      cy.wrap(wordWrapper).click();

      cy.get('.Row-module_row__pwpBq').then((rows) => {
        const row = rows.get(0);
        expect(word).to.not.be.empty;
        expect(row.textContent).to.equal(word);
      });
    });
  });

  it('updates the word selector when a word is inserted', () => {
    // get past the suggested words by inserting a word in the first row
    cy.get('body')
      .trigger('keydown', { key: 'a' })
      .trigger('keydown', { key: 'd' })
      .trigger('keydown', { key: 'i' })
      .trigger('keydown', { key: 'e' })
      .trigger('keydown', { key: 'u' });
    cy.get('button[data-key="↵"]').click();

    cy.wait(4000);

    // select the first word in the word selector
    cy.get('start-button').click();
    cy.get('word-selector').should('be.visible');
    cy.get('word-selector').then((element: JQuery<HTMLElement>) => {
      const shadowRoot = element[0].shadowRoot;
      const wordWrapper = shadowRoot.querySelector('.prediction');
      const wordBeforeUpdate = wordWrapper.querySelector('.prediction-word').textContent;
      cy.wrap(wordWrapper).click().then(() => {
        cy.wait(4000).then(() => {;
          // expect the first word in the selector to be different
          const wordAfterUpdate = wordWrapper.querySelector('.prediction-word').textContent;
          expect(wordBeforeUpdate).to.not.equal(wordAfterUpdate);
        });
      });
    });
  })
});
