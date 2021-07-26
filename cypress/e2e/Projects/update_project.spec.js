describe('Updates project', () => {

    before(() => {
        cy.initDB()
        cy.addLocalUserAsAdmin()
        cy.loadSqlFiles(['e2e/Projects/insert-project-alpha.sql'])
        cy.visit('localhost:3000/projects')
    })

    it('updates project', () => {
        cy.get('[data-testid=ProjectCard__header-title]').should('have.text', 'alpha')

        cy.get('[data-testid=ProjectCard__button-edit]').click()
        cy.get('[data-testid=CreateOrUpdateProjectPopup__input-name]').clear().type('bravado')
        cy.get('[data-testid=Popup__button-submit]').click()

        cy.get('[data-testid=ProjectCard__header-title]').should('have.text', 'bravado')
    })

})