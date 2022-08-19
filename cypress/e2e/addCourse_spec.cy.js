/// <reference types="cypress" />
import { addDays, format } from 'date-fns';
import { type } from 'os';

describe('Add Course form test', () => {
  beforeEach(() => {
    /*cy.visit('/login');
    cy.get('#login_role > :nth-child(3) > :nth-child(2)').click()
    //cy.get('#login_role > :nth-child(3)').click()
    cy.get('#login_email').type('manager@admin.com')
    cy.get('#login_password').type('111111')
    cy.get('.ant-btn > span').click()
    cy.wait(10000)
    cy.get('.ant-menu-item-selected > .ant-menu-title-content > a').click() */
    //cy.intercept('post','/login').as('login');
    cy.login('manager@admin.com','manager').then(() =>
      {
        cy.visit('/dashboard/manager/courses/add-course');
      });
    //cy.wait(10000);
    //cy.wait('@login');

   
  });
 
  it('Able to add Course via manager role', () => {
    
    //Able to add Course Name
    cy.get('#name').type('English Course')

    //Able to add Teacher Name
    cy.get('#teacherId').type('obb');
    cy.intercept('GET', '/api/teachers?query=obb').as('teacher');
    cy.wait('@teacher');
    //cy.get('.ant-select-item-option-content').contains('Rachel Schmitt').click()
    cy.get('.ant-select-item-option-content').first().click();

    //Able to add Type
    cy.get('#type').click()
    cy.intercept('GET', '/api/courses/type').as('type');
    cy.wait(5000);
    cy.get('.ant-select-item-option').contains('C').click();
    cy.get('.ant-select-item-option').contains('Visual Basic').click();
    //cy.wait('@type');

    //Able to add Start date
    cy.get('#startTime').click().then(() => {
      const datePick = format(addDays(new Date(), 10), 'yyyy-MM-dd'); //today date add 10days
      cy.get(`td[title=${datePick}]`).click();
    });
    
    //Able to add Price
    cy.get('#price').type(500);

    //Able to add Student Limit 
    cy.get('#maxStudents').type(100); // why the result will showed 10 on the screen?

    //Able to add Duration 
    cy.get('.ant-input-group > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').click().type(2);
    cy.get('.ant-input-group > .ant-select > .ant-select-selector > .ant-select-selection-item').click().then(() => {
    cy.get('.ant-select-item-option-content').contains('month').click();
    });

    //Able to add Description 
    cy.get('#detail').type('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu ante in odio iaculis hendrerit. Nulla hendrerit augue quis lacinia mollis. Etiam sit amet viverra nunc. Integer ac euismod turpis. Aliquam laoreet est nec interdum ultrices. Pellentesque quis suscipit enim, ac sollicitudin magna. Sed fringilla suscipit tortor eu tristique. ')

    //Able to click button 'Create course' to next page
    cy.get('button[type=submit]').contains('Create Course').click();
    //cy.get('[type="submit"]').contains('Create').click();
    
    //Able to add chapter name & chapter content
    //cy.get('#schedule_chapters_0_name').type('Introduction');
    
    //Able to click button 'Add Chapter' and add second chapter name & chapter content


  })
})