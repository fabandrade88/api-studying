const path = require("path"); //evitar que tenha problema com link dependendo do OS

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, "src", "database","database.db")
    },
    
    
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
    },

    useNullAsDefault: true
  }

};
