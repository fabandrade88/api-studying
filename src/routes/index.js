const { Router } = require("express");

//grupo de rotas

const usersRoutes = require("./users.routes");
const notesRoutes = require("./notes.routes");

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/notes", notesRoutes);

module.exports = routes;