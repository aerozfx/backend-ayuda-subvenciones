const express = require("express");
const webController = require("../controllers/webController");
const webRouter = express.Router();

// Vista principal -> Debe tener un renderizado condicional, dependiendo si el usuario está logeado o no
webRouter.get("/", webController.homePageController);

// Registro user
webRouter.get("/signup", webController.signupPageController);

// User logeado -> Necesitamos middleware que compruebe si el usuario está logueado
webRouter.get("/login", webController.loginPageController);
webRouter.get("/favorites", webController.favoritesPageController);
webRouter.get("/profile", webController.profilePageController);

// Admin -> Necesitamos middleware que compruebe el rol
webRouter.get("/users", webController.usersListController);
webRouter.get("/dashboard", webController.dashboardController);
webRouter.post("/dashboard", webController.createGrant);
webRouter.delete("/dashboard", webController.deleteGrant)
webRouter.get("/logout", (req, res) => res.send("has salido"));

module.exports = webRouter;