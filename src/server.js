const express = require("express"); //importando dados necessario

const routes = require("./routes") //importando as rotas

const app = express();
app.use(express.json()); //para dizer que estamos utilizando JSON
app.use(routes);

//Criando a porta do servidor

const PORT = 3333;

app.listen(PORT, ()=> console.log(`Server is running on PORT ${PORT}`));