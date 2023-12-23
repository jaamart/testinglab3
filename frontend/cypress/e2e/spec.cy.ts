
describe('template spec', () => {
  it('passes', () => {
    cy.checkLocalServer();
    cy.visit('http://localhost:5173')
  })
})
