const AppError = require("../utils/appError");

class UserController {
/**
 * Metodos que podem estar dentro de um controller:
 * index - GET para listar varios registros.
 * show - GET para exibir um registro especifico.
 * create - POST para criar um registro.
 * update - PUT para atualizar um registro.
 * delete - DELETE para remover um registro.
 */

create(request, response){
  const {name, email, password} = request.body;

  if(!name){
    throw new AppError("Nome obrigatorio!");
  }

  response.status(201).json({name, email, password} );
}

};

module.exports = UserController;