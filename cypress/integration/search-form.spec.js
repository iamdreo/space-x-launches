describe('Input form', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })
  
    it('accepts input', () => {
      const typedText = 'Buy Milk'
  
      cy.get('#search-input')
        .type(typedText)
        .should('have.value', typedText)
    })
  })