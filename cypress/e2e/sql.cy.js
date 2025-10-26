//password: test$12345$mg$

describe("connect to test db", () => {
  it("can connect to db", () => {
    cy.task(
      "queryDb",
      "CREATE TABLE Students (StudentID int, FirstName varchar(255), StudentGroup varchar(255), City varchar(255))"
    );
  });

  it("input entries", () => {
    cy.task(
      "queryDb",
      `INSERT INTO Students (StudentID, FirstName, StudentGroup, City) VALUES
      (1, "Ivan", "02-2025", "Russia"),
      (2, "Simon", "04-2025", "Tokio"),
      (3, "Peter", "05-2025", "China")
      `
    ).then((result) => {
      cy.log(JSON.stringify(result));
      expect(result.affectedRows).to.equal(3);
    });
  });

  it("select", () => {
    cy.task(
      "queryDb",
      `SELECT FirstName FROM Students WHERE City="China"`
    ).then((result) => {
      cy.log(JSON.stringify(result));
      expect(result[0].FirstName).to.equal("Peter");
    });
  });

  it("delete the db", () => {
    cy.task("queryDb", "DROP TABLE Students");
  });
});
