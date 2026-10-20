describe('practice', () => {
  it.skip('find property in table', () => {
    cy.visit('https://testautomationpractice.blogspot.com/')
    cy.get('tbody[id="rows"] tr').contains('Chrome').should('have.text', 'Chrome')
  })

  it.skip('handle another link', () => {
    cy.visit('https://testautomationpractice.blogspot.com/')
    cy.get('a.feed-link').invoke('removeAttr', 'target').click()
    cy.url().should('include', 'eeds/posts/default')
  })

  it.skip('double click and fetch text', () => {
    cy.visit('https://testautomationpractice.blogspot.com/')
    cy.contains('Copy Text').dblclick()
    cy.get('#field2').should('have.value', 'Hello World!')
    cy.get('#field2').invoke('val').then((text) => {
      cy.log(text)
    })
    cy.get('#field2').then(($input) => {
      const inputValue = $input.val()
      cy.log(inputValue)
    })
  })

  it('fake api call', () => {
    cy.visit('https://testautomationpractice.blogspot.com/')
    cy.request('GET', 'https://jsonplaceholder.typicode.com/posts/1').as('users')

    cy.get('tbody[id="rows"] tr').contains('Chrome').should('have.text', 'Chrome')
    cy.get('@users').then((interception) => {
        const responseBody = interception.body
        cy.log(JSON.stringify(responseBody))
    })
})

it.skip('click and check api call',()=>{
  cy.visit('https://testautomationpractice.blogspot.com/')
  cy.intercept('GET','users/postuser/1').as('@users');

  cy.get('#search').click();

  cy.wait('@users').then(
    (interception)=>{
      except(interception.response.statusCode).to.equal(200);
    }
  )

  cy.get('.products').should('contain','Hp');
})

it.skip('mock real api ',()=>{
  cy.get('GET', '/api/users',{
    statusCode : 200,
    body:{
      users:[
        {
        id:1,
        name:"Satyam"
        }
      ]
    }
  }
  ).as('@users')

  cy.visit('/users');
  cy.wait('@users').then(
    (res)=>{
      cy.log(res)
    }
  )
})
})