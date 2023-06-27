const express = require("express");
const apiRouter = express.Router();
const users = require("../controllers/usersApiController");
const favorites = require("../controllers/favoritesApiController");
const grants = require("../controllers/grantsApiControllers");
const { checkUser } = require("../middlewares/loginHandler");

// USER
// Obtiene todos los usuarios si no se pasa email, o uno si se pasa un email válido
apiRouter.get("/users/:email?", users.getUsers);
// Crea un usuario
apiRouter.post("/users", users.createUser);
// Actualiza un usuario por email
apiRouter.post("/users/:email?", users.updateUser);
// Borra un usuario por email
apiRouter.delete("/users/:email?", users.deleteUser);

// FAVORITES
// Todos los favoritos si no se pasa un id, o uno si se pasa un id específico
apiRouter.get("/favorites/:id?", favorites.getFavorites);
apiRouter.post("/favorites", favorites.addFavorite);
apiRouter.delete("/favorites/:id?", favorites.deleteFavorite);

// GRANTS
// Todas las subvenciones o una si se pasa un id específico
apiRouter.get("/grants/:id?", grants.getAllGrants);
apiRouter.patch("/grants/:id?", grants.updateOneGrant);
apiRouter.delete("/grants/:id?", grants.deleteOneGrant);

apiRouter.post("/login", checkUser, users.loginUser);

module.exports = apiRouter;
