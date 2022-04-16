describe('Blog app', () => {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Kacey Steinhammer',
      username: 'admin',
      password: 'admin',
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.get('[data-cy=login-form]')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('[data-cy=username-input]').type('admin')
      cy.get('[data-cy=password-input]').type('admin')
      cy.get('[data-cy=login-submit').click()

      cy.contains('Kacey Steinhammer logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('[data-cy=username-input]').type('wrong')
      cy.get('[data-cy=password-input]').type('wrong')
      cy.get('[data-cy=login-submit').click()

      cy.contains('Wrong username or password')
      cy.get('[data-cy=notification]').should(
        'have.css',
        'color',
        'rgb(255, 0, 0)'
      )
      cy.get('[data-cy=login-form]')
    })
  })
})
