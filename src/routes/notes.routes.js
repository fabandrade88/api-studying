const{ Router } = require("express"); //importando

const NotesController = require("../controllers/NotesController");
const notesRoutes = Router();

function myMiddleware(request, response, next){
  console.log("vc passou pelo middleware")
  next();
}

const notesController = new UserController();

//metodo POST
notesRoutes.post("/:user_id", myMiddleware, notesController.create);

module.exports = notesRoutes; //exportar a rotas para o server ver.