describe("app compares two launches on click", () => {
  it("loads data on page load and handles click", () => {
    cy.fixture("spacex").as("spacexData");
    cy.server().route({
      method: "GET",
      url: "/graphql/",
      response: "@spacexData",
    });
    cy.visit("localhost:3000/");

    cy.get(".MuiCardContent-root").should("have.length", 20);

    cy.get(".MuiButton-sizeSmall").click({ multiple: true, force: true });
  

    cy.get(".MuiDialog-paper").should("have.length", 1);

    cy.get(".MuiIconButton-edgeStart").click();

    cy.get(".MuiDialog-paper").should("have.length", 0);
    
  });
});
