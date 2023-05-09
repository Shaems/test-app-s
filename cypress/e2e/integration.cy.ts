describe('Web App Testing', () => {
  it('shows the landing page', () => {
    cy.viewport('samsung-s10');
    cy.visit('/')
    cy.contains('Test_app');
  });

  it('shows the login page', () => {
    cy.viewport('samsung-s10');
    cy.visit('/')
    cy.get('ion-button').contains('Iniciar sesión').click();
  });

  it('complete login', () => {
    cy.viewport('samsung-s10');
    cy.visit('/auth/login');
    cy.get('input[name=email]').type('valid-email@example.com')
    cy.get('input[name=password]').type('123456', { delay: 100 })
    cy.get('ion-toggle').click();
    cy.get('ion-button[type=submit]').click();
  });

})