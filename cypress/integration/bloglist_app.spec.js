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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'admin',
        password: 'admin',
      }).then(({ body }) => {
        localStorage.setItem('loggedUser', JSON.stringify(body))
        cy.visit('http://localhost:3000')
      })
    })

    it('a blog can be created', function () {
      const blog = {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
      }

      cy.request({
        method: 'POST',
        url: 'http://localhost:3003/api/blogs',
        body: blog,
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('loggedUser')).token
          }`,
        },
      })
      cy.visit('http://localhost:3000')

      cy.contains('React patterns')
      cy.contains('Michael Chan')
    })

    describe('and blog is exists', function () {
      beforeEach(function () {
        const blog = {
          title: 'React patterns',
          author: 'Michael Chan',
          url: 'https://reactpatterns.com/',
        }

        cy.request({
          method: 'POST',
          url: 'http://localhost:3003/api/blogs',
          body: blog,
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem('loggedUser')).token
            }`,
          },
        })
        cy.visit('http://localhost:3000')
      })

      it('can like a blog', function () {
        cy.get('[data-cy=show-bloginfo]').click()
        cy.get('[data-cy=like-submit]').click()
        cy.contains('likes 1')
      })
    })
  })
})
