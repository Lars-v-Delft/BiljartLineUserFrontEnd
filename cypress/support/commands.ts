/// <reference types="cypress" />

Cypress.Commands.add('login', (username, password) => {
    cy.visit('http://localhost:3000');

    cy.get('a[href*="/signin"]').click()
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('adminLogin', () => {
    // cy.wait(1000);
    cy.visit('http://localhost:3000');
    cy.wait(1000);

    cy.get('a[href*="/signin"]').click()
    cy.get('input[name="username"]').type('admin');
    cy.get('input[name="password"]').type('Correct1/');

    // cy.wait(1000);

    cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('logout', () => {
    cy.visit('http://localhost:3000');
    cy.get('a[href*="/signout"]').click();
});

declare namespace Cypress {
    interface Chainable {
        login(username: string, password: string): Chainable<void>
        adminLogin(): Chainable<void>
        logout(): Chainable<void>
    }

}

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(username: string, password: string): Chainable<void>
//     //   drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//     //   dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//     //   visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }