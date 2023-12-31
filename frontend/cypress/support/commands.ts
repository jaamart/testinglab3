/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cyp+ress.io/custom-commands
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
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }


Cypress.Commands.add("resetDatabase", () => {
  const pgUri = Cypress.env("CYPRESS_PG") || Cypress.env("PGURI");
  if (!pgUri) {
   throw new Error ("DB Connection string missing")
  }
    cy.exec(`psql -f init.sql ${pgUri}`);
})


Cypress.Commands.add("checkLocalServer", () => {
  cy.request({
    method: 'GET',
    url: 'http://localhost:3000/api/clients',
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.status).to.eq(200);
  });
});
