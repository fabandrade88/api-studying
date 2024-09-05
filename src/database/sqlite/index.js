const sqlite3 = require("sqlite3"); //importar o sqlite3 resp. pelo driver
const sqlite = require("sqlite"); //importar o sqlite resp. por conectar
const path = require("path");

async function sqliteConnection() {
  const database = await sqlite.open({
    filename: path.resolve(__dirname, "..", "database.db"), //para que o caminho se adapte para qualquer OS.
    driver: sqlite3.Database
  });

  return database;
  
};

module.exports = sqliteConnection;