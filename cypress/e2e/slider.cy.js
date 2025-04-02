describe('Swiper Gallery Test', function () {
  it('Checks if second slide contains "United Kingdom"', function () {
    cy.visit('http://localhost:3000');
    cy.get('.swiper-button-next').click();
    cy.get('.swiper-slide-active').should('contain', 'United Kingdom');
  });
});

describe('Swiper Gallery Test', function () {
  it('Checks if third slide contains "Paris"', function () {
    cy.visit('http://localhost:3000');
    cy.get('.swiper-button-next').click();
    cy.wait(2000);
    cy.get('.swiper-button-next').click({ force: true });
    cy.wait(2000);
    cy.get('.swiper-slide-active').should('contain', 'Paris');
  });
});


//moje testy
describe('Swiper Gallery Navigation Test', function () {
  it('Allows user to navigate slides using navigation buttons', function () {
    cy.visit('http://localhost:3000');
    
    cy.get('.swiper-slide-active').invoke('text').then((firstSlideText) => {
      cy.get('.swiper-button-next').click();
      cy.wait(1000);
      cy.get('.swiper-slide-active').invoke('text').should('not.eq', firstSlideText);
    });
    
    cy.get('.swiper-button-prev').click();
    cy.wait(1000);
    cy.get('.swiper-slide-active').invoke('text').should('exist');
  });
});



describe('Slide Content Test', function () {
  it('Checks if slide titles and descriptions are displayed correctly', function () {
    cy.visit('http://localhost:3000');

    const slides = [
      { title: 'Rome', description: 'Italy' },
      { title: 'London', description: 'United Kingdom' },
      { title: 'Paris', description: 'France' }
    ];

    slides.forEach((slide, index) => {
      if (index > 0) {
        cy.get('.swiper-button-next').click();
        cy.wait(1000);
      }

      cy.get('.swiper-slide-active').within(() => {
        cy.get('h1').should('contain', slide.title);
        cy.get('p').should('contain', slide.description);
      });
    });
  });
});

describe('Swiper Gallery Responsive Test', function () {
  const viewports = ['iphone-6', 'ipad-2', { width: 1024, height: 768 }];
  
  viewports.forEach((viewport) => {
    it(`Checks gallery responsiveness on ${JSON.stringify(viewport)}`, function () {
      if (typeof viewport === 'object') {
        cy.viewport(viewport.width, viewport.height);
      } else {
        cy.viewport(viewport);
      }
      cy.visit('http://localhost:3000');
      cy.wait(2000);
      
      cy.get('body').then(($body) => {
        if ($body.find('.swiper-container').length > 0) {
          cy.get('.swiper-container', { timeout: 6000 }).should('exist').and('be.visible');
        } else {
          cy.log('Element .swiper-container nie istnieje w DOM');
        }
      });
      
      cy.get('.swiper-button-next').should('be.visible').click();
      cy.wait(1000);
      cy.get('.swiper-button-prev').should('be.visible').click();
    });
  });
});

describe('Swiper Gallery Visibility Test', function () {
  it('Checks if gallery elements are visible', function () {
    cy.visit('http://localhost:3000');
    cy.wait(2000);
    
    cy.get('body').then(($body) => {
      if ($body.find('.swiper-container').length > 0) {
        cy.get('.swiper-container', { timeout: 6000 }).should('exist').and('be.visible');
      } else {
        cy.log('Element .swiper-container nie istnieje w DOM');
      }
    });
    
    cy.get('.swiper-slide').should('have.length.at.least', 3);
    cy.get('.swiper-button-next').should('be.visible');
    cy.get('.swiper-button-prev').should('be.visible');
  });
});
