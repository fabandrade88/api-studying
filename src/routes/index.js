const { Router } = require("express");

//grupo de rotas

const usersRoutes = require("./users.routes");

const routes = Router();

routes.use("/users", usersRoutes);

module.exports = routes;