/// <reference types="cypress" />

describe('Login page test', () => {

  beforeEach(function () {
    cy.visit('/login');
    cy.fixture('userLogin').then((users) => {
      this.users = users;
    })
  });

  it('Verify the title display on screen', () => {
    cy.contains('Course Management Assistant')
  })
  
  it('Verify 3 roles display on screen', () => {
    const radioBtn = ['Student','Teacher','Manager']; //3 roles radio button
    cy.get('input[type=radio]').should('have.length', radioBtn.length);
    
    radioBtn.forEach((role) => {
      cy.get('label').contains(role).should('be.visible');
    });
  });

  it('Verify the email textbox display on screen', () => {
    cy.get('input[type=email]').should('be.visible');
  })

  it('Verify the password textbox display on screen', () => {
    cy.get('input[type=password]').should('be.visible');
  })  

  it('Verify the remember me checkbox display on screen', () => {
    cy.get('input[type=checkbox]').should('be.checked');
  })
              
  it('Verify the sign in button display on screen', () => {
    cy.get('button[type=submit]').should('be.visible');
  })

  it('Verify the sign up link display on screen and able to navigate to correct URL', () => {
    cy.contains('Sign up').should('be.visible').click().url().should("include","/signup");    
  })
    
  it('Able to login with Student account', function(){
    const student = this.users.find((user) => user.role === 'student');
    cy.get('label').contains('Student').click();
    cy.get('input[type=email]').type(student.email).should('have.value', student.email);
    cy.get('input[type=password]').type(student.password).should('have.value', student.password);
    cy.get('button[type=submit]').click().url().should('include','dashboard');
  })   
  
  it('Able to login with Teacher account', function(){
    const teacher = this.users.find((user) => user.role === 'teacher');
    cy.get('label').contains('Teacher').click();
    cy.get('input[type=email]').type(teacher.email).should('have.value', teacher.email);
    cy.get('input[type=password]').type(teacher.password).should('have.value', teacher.password);
    cy.get('button[type=submit]').click().url().should('include','dashboard');
  })   

  it('Able to login with Manager account', function(){
    const manager = this.users.find((user) => user.role === 'manager');
    cy.get('label').contains('Manager').click();
    cy.get('input[type=email]').type(manager.email).should('have.value', manager.email);
    cy.get('input[type=password]').type(manager.password).should('have.value', manager.password);
    cy.get('button[type=submit]').click().url().should('include','dashboard');
  })   
})