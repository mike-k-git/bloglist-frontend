describe('Blog app', () => {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.createUser({
      name: 'Kacey Steinhammer',
      username: 'admin',
      password: 'admin',
    })
    cy.createUser({
      name: 'Thorstein Dunridge',
      username: 'root',
      password: 'root',
    })
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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'admin', password: 'admin' })
    })

    it('a blog can be created', function () {
      cy.contains('create new').click()
      cy.get('[data-cy=blog-title]').type('React patterns')
      cy.get('[data-cy=blog-author]').type('Michael Chan')
      cy.get('[data-cy=blog-url]').type('https://reactpatterns.com/')
      cy.get('[data-cy=blog-create]').click()
      cy.visit('http://localhost:3000')

      cy.contains('React patterns')
      cy.contains('Michael Chan')
    })

    describe('and blog is exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'React patterns',
          author: 'Michael Chan',
          url: 'https://reactpatterns.com/',
        })
        cy.visit('http://localhost:3000')
      })

      it('can like a blog', function () {
        cy.get('[data-cy=show-bloginfo]').click()
        cy.get('[data-cy=like-submit]').click()
        cy.contains('likes 1')
      })

      it('can remove own blog', function () {
        cy.get('[data-cy=show-bloginfo]').click()
        cy.get('[data-cy=blog-remove]').click()
        cy.contains('React patterns').should('not.exist')
        cy.contains('Michael Chan').should('not.exist')
      })

      describe('and blog of another user exists', function () {
        beforeEach(function () {
          cy.login({ username: 'root', password: 'root' })
        })

        it('cannot remove blog', function () {
          cy.get('[data-cy=show-bloginfo]').click()
          cy.get('[data-cy=blog-remove]').should('not.exist')
        })
      })
    })
  })
})
