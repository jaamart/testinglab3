import { When, Then, Given } from '@badeball/cypress-cucumber-preprocessor'

Given('Jag är på hemsidan och formuläret är tomt', () => {
  cy.visit('http://localhost:5173/')
})

When('Jag skriver in något i namn-fältet', () => {
  cy.get('[data-cy="client-name"').type('ITHS')

})

Then('Värdet ska stå i namn-fältet', () => {
  cy.get('[data-cy="client-name"').should('have.value', 'ITHS')
})
