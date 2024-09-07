const bcrypt = require("bcryptjs");
const { hash, compare } = bcrypt;

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
  };

  const hashedPassword = await bcrypt.hash(password, 10); //criar encriptografia

  await database.run(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]);

  return response.status(201).json();
  
}

async update (request, response) {
  const{ name, email, password, old_password} = request.body;
  const{ id } = request.params;

  const database = await sqliteConnection();
  const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

  if(!user) {
    throw new AppError("Usuario nao encontrado");
  }

  const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);
  if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
    throw new AppError("ESTE EMAIL JA ESTA EM USO");
  }

  user.name = name ?? user.name;
  user.email = email ?? user.email;

  if ( password && !old_password) {
    throw new AppError("Voce precisa informar a senha antiga para redefinir sua senha")
  }

  if (password && old_password) {
    const checkOldPassword = await compare(old_password, user.password);

    if (!checkOldPassword){
      throw new AppError("A senha antiga nao confere");
    }
    user.password = await bcrypt.hash(password, 10);
  }

  await database.run(`
    UPDATE users SET
    name = ?,
    email = ?,
    password = ?,
    update_at = DATETIME('now')
    WHERE id = ?`,
    [user.name, user.email, user.password, id]
  );

  return response.json();

}

}

module.exports = UserController;