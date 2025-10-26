
//password: test$12345$mg$

describe('connect to test db', () => {
  it('can connect to db', () => {
    cy.task("queryDb", "CREATE TABLE Students (StudentID int, FirstName varchar(255), StudentGroup varchar(255), City varchar(255))")
  })
  it("delete the db", ()=>{
    cy.task("queryDb", "DROP TABLE Students")
  })
})