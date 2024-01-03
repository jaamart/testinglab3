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

Given('Jag är på hemsidan och redo att fylla i formuläret', () => {
  cy.visit('http://localhost:5173/')
  cy.resetDatabase()
})

When('Jag fyller i formuläret och klickar på submit', () => {
  cy.get('[data-cy="client-name"').type('Exempelföretag')
  cy.get('[data-cy="client-shortname"').type('TEST')
  cy.get('[data-cy="client-id"').type('9999')
  cy.get('[data-cy="client-bank"').type('Falkenbergs Sparbank')
  cy.get('[data-cy="client-form"').type('AB')
  cy.get('[data-cy="client-endofyear"').type('8')
  cy.get('[data-cy="client-booksfreq"').type('1')
  cy.get('[data-cy="client-vatfreq"').type('12')
  cy.get('[data-cy="add-client"').click()
})

Then('Värdena läggs till i databasen och backendet skickar samma information som lagts in i formuläret och visar det på sidan', () => {
  cy.get('[data-cy="incoming-client-name"').contains('Exempelföretag')
  cy.get('[data-cy="incoming-client-shortname"').contains('TEST')
  cy.get('[data-cy="incoming-client-id"').contains('9999')
  cy.get('[data-cy="incoming-client-bank"').contains('Falkenbergs Sparbank')
  cy.get('[data-cy="incoming-client-endofyear"').contains('8')
})

Given('Sidan har laddat in en lista med kunder och visar den till vänster', () => {
  cy.visit('http://localhost:5173/')
  cy.get('ul > li')
})

When('Jag klickar på en av dem', () => {
  cy.get('ul > li:first > a').click()
})

Then('Sidan visar information om rätt kund', ()=> {
  let one, two
  cy.get('ul > li:first > a').contains('Krebet')
  cy.get('[data-cy="shortname"').contains('Krebet')
})
