describe('competition', () => {
  it('can navigate to competition dashboard', () => {
    cy.adminLogin();

    cy.get('a').contains('Competities').click();
    cy.url().should('include', '/bonden/');

    cy.url().should('include', '/bonden');
  });
  it('can create a new competition', () => {
    cy.adminLogin();

    cy.get('a').contains('Competities').click();
    cy.get('a[href*="/competities/toevoegen"]').click();
    cy.url().should('include', '/competities/toevoegen');

    // input competitiondata
    cy.get('input[aria-label="Naam"]').type('Test competitie');
    cy.get('button[id="react-aria-:R7qqqqqqkqH2:"').click();
    cy.get('li').contains('Libre').click();
    cy.get('input[aria-label="Startdatum"]').type('2020-12-31');
    cy.get('input[aria-label="Einddatum"]').type('2200-12-31');

    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/bonden/');

    cy.get('li').contains('Test competitie').should('exist');
  });
  it('can edit a competition', () => {
    cy.adminLogin();

    cy.get('a').contains('Competities').click();
    cy.get('a').contains('Test competitie')
      .parent()
      .children('a').contains('Aanpassen').click();
    cy.url().should('match', /\/competities\/\d+\/aanpassen/);

    // edit competitiondata
    cy.get('input[aria-label="Naam"]').clear().type('Aangepaste test competitie');
    cy.get('button[id="react-aria-:R9qqqqqqqkqH2:"').click();
    cy.get('li').contains('Bandstoten').click();
    cy.get('input[aria-label="Startdatum"]').type('2000-01-01');
    cy.get('input[aria-label="Einddatum"]').type('2222-01-01');

    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/bonden/');

    cy.get('li').contains('Aangepaste test competitie').should('exist');
  });
  it('can delete a competition', () => {
    cy.adminLogin();

    cy.get('a').contains('Competities').click();

    cy.get('li').contains('Aangepaste test competitie').should('exist');
    cy.get('a').contains('Aangepaste test competitie')
      .parent()
      .children('button').contains('Verwijder').click();
    cy.get('li').contains('Aangepaste test competitie').should('not.exist');
  });
});