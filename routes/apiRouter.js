const express = require("express");
const handler404 = require("../middlewares/404handler");
const apiRouter = express.Router();
const users = require("../controllers/usersApiController");
const favorites = require("../controllers/favoritesApiController");
const grants = require("../controllers/grantsApiControllers");
const {
  checkUser,
  checkCookie,
  checkAdminRole,
} = require("../middlewares/loginHandler");

// TOKEN
apiRouter.get("/token", users.generateToken);

// USER
// Obtiene todos los usuarios si no se pasa email, o uno si se pasa un email válido
apiRouter.get("/users/:email?", users.getUsers);
// Crea un usuario
apiRouter.post("/users", users.createUser);
// Actualiza un usuario por email
apiRouter.post("/users/:email?", checkCookie, users.updateUser);
// Borra un usuario por email
apiRouter.delete(
  "/users/:email?",
  checkCookie,
  checkAdminRole,
  users.deleteUser
);

// FAVORITES
// Todos los favoritos si no se pasa un id, o uno si se pasa un id específico
apiRouter.get("/favorites", checkAdminRole, favorites.getFavorites);
apiRouter.post("/favorites", checkCookie, favorites.addFavorite);
apiRouter.delete("/favorites/:id?", checkCookie, favorites.deleteFavorite);

// GRANTS
// Todas las subvenciones o una si se pasa un id específico

apiRouter.get("/grants/:id?", grants.getAllGrants);

apiRouter.patch(
  "/grants/:id?",
  checkCookie,
  checkAdminRole,
  grants.updateOneGrant
);
apiRouter.delete(
  "/grants/:id?",
  checkCookie,
  checkAdminRole,
  grants.deleteOneGrant
);

apiRouter.post("/login", checkUser, users.loginUser);
apiRouter.get("/docs", users.apiDocs);
apiRouter.use(handler404);
module.exports = apiRouter;

//JSDOCS
apiRouter.get("/docs");
