const{ Router } = require("express"); //importando

const usersRoutes = Router();

//metodo POST
usersRoutes.post("/", (request, response)=> {
  const {name, email, password} = request.body;

  response.json({name, email, password} );
});

module.exports = usersRoutes; //expor a routas para o server ver.