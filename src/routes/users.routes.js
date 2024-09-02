const{ Router } = require("express"); //importando

const UserController = require("../controllers/UserController");
const usersRoutes = Router();

const usersController = new UserController();

//metodo POST
usersRoutes.post("/", usersController.create);

module.exports = usersRoutes; //expor a routas para o server ver.