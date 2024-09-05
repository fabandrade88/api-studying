const{ Router } = require("express"); //importando

const UserController = require("../controllers/UserController");
const usersRoutes = Router();

function myMiddleware(request, response, next){
  console.log("vc passou pelo middleware")
  next();
}

const usersController = new UserController();

//metodo POST
usersRoutes.post("/", myMiddleware, usersController.create);
usersRoutes.put("/:id", usersController.update);

module.exports = usersRoutes; //exportar a rotas para o server ver.