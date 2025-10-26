const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    db: {
      ${{secrets.SQL_DATA}}
    },
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      //password: test$12345$mg$
      on("task", {
        queryDb: (query) => {
          return queryTestDb(query, config)
        },
      });
    },
  },
});

const mysql = require("mysql");
function queryTestDb(query, config) {
  const connection = mysql.createConnection(config.env.db);
  connection.connect();
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) reject(error);
      else {
        connection.end();
        return resolve(results);
      }
    });
  });
}
