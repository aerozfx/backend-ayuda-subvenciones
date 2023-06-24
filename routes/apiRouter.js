const express = require("express");
const apiRouter = express.Router();
const users = require("../controllers/usersApiController");
const favorites = require("../controllers/favoritesApiController");
const grants = require("../controllers/grantsApiControllers");

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
apiRouter.get("/ads/:id?", grants.getAllGrants);
apiRouter.post("/ads", grants.createOneGrant);
apiRouter.patch("/ads/:id?", grants.updateOneGrant);
apiRouter.delete("/ads/:id?", grants.deleteOneGrant);

module.exports = apiRouter;
