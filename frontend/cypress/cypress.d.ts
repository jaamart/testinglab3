declare namespace Cypress {
  interface Chainable {
    resetDatabase(): Chainable<JQuery<HTMLElement>>,
    checkLocalServer(): Chainable<JQuery<HTMLElement>>,
  }
}
