require("express-async-errors");

const migrationRun = require("./database/sqlite/migrations");
const AppError = require("./utils/appError");

const express = require("express"); //importando dados necessario

const routes = require("./routes") //importando as rotas

migrationRun(); //executar o banco de dados

const app = express();
app.use(express.json()); //para dizer que estamos utilizando JSON

app.use(routes);

app.use((error, request, response,next) => {
  if(error instanceof AppError){
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }

  console.error(error);

  return response.status(500).json({
    status: "error",
    message: error.message
  })
});

//Criando a porta do servidor

const PORT = 3333;

app.listen(PORT, ()=> console.log(`Server is running on PORT ${PORT}`));