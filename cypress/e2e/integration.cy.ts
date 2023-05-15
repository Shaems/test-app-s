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

  it('should return correct error message for a email with invalid', () => {
    cy.viewport('samsung-s10');
    cy.visit('/auth/login');
    cy.get('input[name=email]').type('email-invalid')
    cy.get('input[name=password]').type('123456', { delay: 100 })
    cy.get('ion-toggle').click();
    cy.get('ion-button[type=submit]').click();
    cy.get('.error-message').first().should('have.text', 'El email no es válido.')
  });

  it('should return correct error message for a password with invalid', () => {
    cy.viewport('samsung-s10');
    cy.visit('/auth/login');
    cy.get('input[name=email]').type('valid-email@example.com')
    cy.get('input[name=password]').type('1234', { delay: 100 })
    cy.get('ion-toggle').click();
    cy.get('ion-button[type=submit]').click();
    cy.get('.error-message').first().should('have.text', 'La contraseña debe tener al menos 5 caracteres.')
  });

  it('should return correct error message for a password with invalid', () => {
    cy.viewport('samsung-s10');
    cy.visit('/auth/login');
    cy.get('input[name=email]').type('invalid-email')
    cy.get('input[name=password]').type('1234', { delay: 100 })
    cy.get('ion-toggle').click();
    cy.get('ion-button[type=submit]').click();
    cy.get('.error-message').first().should('have.text', 'El email no es válido.')
    cy.get('.error-message').last().should('have.text', 'La contraseña debe tener al menos 5 caracteres.')
  });

})