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

Given('Jag är på hemsidan och redo att fyllai formuläret', () => {
  cy.visit('http://localhost:5173/')

})

When('Jag fyller i formuläret och klickar på submit', () => {

})

Then('Värdena läggs till i databasen och backendet skickar bekräftelse på vad som lagts till', () => {

})
