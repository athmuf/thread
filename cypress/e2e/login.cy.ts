/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when username is empty
 *   - should display alert when password is empty
 *   - should display alert when username and password are wrong
 *   - should display homepage when username and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('should display login dialog correctly', () => {
    cy.visit('http://localhost:3000/');
    cy.contains('button', 'Log In').click();
    cy.get('[role="dialog"]').should('be.visible');

    cy.get('input[placeholder="johndoe@example.com"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
  });

  it('should display alert when username is empty', () => {
    cy.contains('button', 'Log In').click();
    cy.contains('button', 'Login').click();
    cy.contains('Email must be a valid email').should('be.visible');
  });

  it('should display alert when password is empty', () => {
    cy.contains('button', 'Log In').click();
    cy.get('input[placeholder="johndoe@example.com"]').type(
      'testuser@example.com',
    );
    cy.get('button')
      .contains(/^Login$/)
      .click();
    cy.contains('"password" is not allowed to be empty').should('be.visible');
  });

  it('should display alert when username and password are wrong', () => {
    cy.contains('button', 'Log In').click();
    cy.get('input[placeholder="johndoe@example.com"]').type(
      'testuser@yopmail.com',
    );
    cy.get('input[type="password"]').type('wrong_password');
    cy.get('button')
      .contains(/^Login$/)
      .click();
    cy.contains('email or password is wrong').should('be.visible');
  });

  it('should display homepage when username and password are correct', () => {
    cy.contains('button', 'Log In').click();
    cy.get('input[placeholder="johndoe@example.com"]').type(
      'testfe2@yopmail.com',
    );
    cy.get('input[type="password"]').type('123456');
    cy.get('button')
      .contains(/^Login$/)
      .click();
    cy.get('div[data-slot="dropdown-menu-trigger"]').click();
    cy.get('div[data-slot="dropdown-menu-label"]')
      .contains('Log Out')
      .should('be.visible');
  });
});
