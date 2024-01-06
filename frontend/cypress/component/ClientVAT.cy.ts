import ClientVAT from "../../src/components/ClientVAT.vue"

describe('ClientVAT.cy.js', () => {
  it('mounts, laddar in en fake månad, klickar på knappen och CSS ändras', () => {
    cy.mount(ClientVAT, {
      props: {
          clients: [
            {
              clientid: 9999,
              clientname: 'TEST',
              shortname: "TEST",
              corporateform: "AB",
              bank: "Sparbanken",
              endofyear: 2,
              booksfrequency: 1,
              vatfrequency: 1,
              monthid: 1,
              monthname: "Januari",
              recordid: 1,
              year: 2024,
              isbookkeepingdone: false,
              isvatdone: false
            }
          ]
      }
    })
    cy.get("Button").should("contain", "Färdig")
    cy.get("Button").click()
    cy.get("Button").should("contain", "Ångra")
    cy.get('[data-cy="test-div"').should('have.css', 'background-color', 'rgb(128, 128, 128)')
    cy.get('[data-cy="test-div"').should('have.css', 'text-decoration', 'line-through rgb(0, 0, 0)')
  })
})
