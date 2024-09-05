const AppError = require("../utils/appError");
const sqliteConnection = require("../database/sqlite");

class UserController {
/**
 * Metodos que podem estar dentro de um controller:
 * index - GET para listar varios registros.
 * show - GET para exibir um registro especifico.
 * create - POST para criar um registro.
 * update - PUT para atualizar um registro.
 * delete - DELETE para remover um registro.
 */

async create(request, response) {
  const {name, email, password} = request.body;
  
  //verificao se o email ja existe

  const database = await sqliteConnection();
  const checkUserExist = await database.get("SELECT * FROM users WHERE email = (?)", [email]) //email substitui a ?

  if(checkUserExist){
    throw new AppError("Este email ja esta em uso");
  }

  await database.run(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password]);

  return response.status(201).json();
  
}


}

module.exports = UserController;