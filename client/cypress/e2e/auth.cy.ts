describe("template spec", () => {
  it("should display error on invalid signup input", () => {
    cy.visit("http://localhost:5000/");
    cy.get("#home-signup-btn").click();

    cy.get("#username-input").type("fefe###");
    cy.get("#password-input").type("jjf");
    cy.get("#submit-btn").click();

    cy.get(".error.username").should(
      "have.text",
      "Username can contain: letters, numbers, underscore or hyphen"
    );
    cy.get(".error.password").should(
      "have.text",
      "Minimum password lenght is 6 characters"
    );
  });

  it("should clear signup username error upon re-enter but keep password error", () => {
    cy.visit("http://localhost:5000/");
    cy.get("#home-signup-btn").click();

    cy.get("#username-input").type("fefjejfe");
    cy.get("#password-input").type("jjf");
    cy.get("#submit-btn").click();

    cy.get(".error.username").should("have.text", "");
    cy.get(".error.password").should(
      "have.text",
      "Minimum password lenght is 6 characters"
    );
  });

  it("should upon successfull signup redirect to /play/portfolio and dipplay username", () => {
    cy.visit("http://localhost:5000/");
    cy.get("#home-signup-btn").click();

    cy.get("#username-input").type("testerDave123");
    cy.get("#password-input").type("test123");
    cy.get("#submit-btn").click();

    cy.url().should("eq", "http://localhost:5000/play/portfolio");
    cy.get("#signin-user-div p").should("have.text", "testerDave123");
  });
});
