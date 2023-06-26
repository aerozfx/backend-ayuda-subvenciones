const express = require("express");
const webController = require("../controllers/webController");
const loginHandler = require("../middlewares/loginHandler");
const webRouter = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
require("../utils/google-auth");

// Vista principal -> Debe tener un renderizado condicional, dependiendo si el usuario está logeado o no
webRouter.get("/", webController.homePageController);
// Registro user
webRouter.get("/signup", webController.signupPageController);

// User logeado -> Necesitamos middleware que compruebe si el usuario está logueado
webRouter.get("/login", webController.loginPageController);
webRouter.get(
  "/login/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
    prompt: "select_account",
  })
);
webRouter.get(
  "/callback",
  passport.authenticate("google", { failureRedirect: "/error" }),
  (req, res) => {
    const payload = {
      //save here data
      check: true,
    };
    const token = jwt.sign(payload, `secret_key`, {
      expiresIn: "20m",
    });
    //Almacenamos el token en las cookies
    res.cookie("access-token", token, {
      httpOnly: true,
      sameSite: "strict",
    });
    res.redirect("/");
  }
);

webRouter.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy();
    res.clearCookie("access-token").redirect("/");
  });
});
webRouter.get("/error", (req, res) => res.send("error"));
webRouter.get(
  "/favorites",
  loginHandler.checkCookie,
  webController.favoritesPageController
);
webRouter.get("/profile", webController.profilePageController);

// Admin -> Necesitamos middleware que compruebe el rol
webRouter.get("/users", webController.usersListController);

webRouter.get(
  "/dashboard",
  loginHandler.checkCookie,
  loginHandler.checkRole,
  webController.dashboardController
);
webRouter.post("/dashboard", webController.createGrant);
webRouter.delete("/dashboard/:id", webController.deleteGrant);
webRouter.get("/logout", (req, res) => res.send("has salido"));

webRouter.get("/grants", webController.grantsListController);

webRouter.get("/logout", webController.logoutPageController);

module.exports = webRouter;
