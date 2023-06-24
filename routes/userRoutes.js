const express = require("express");
const userRouter = express.Router();
const userControllers = require('../controllers/usersControllers')

userRouter.get("/users", userControllers.getRegisteredUsers);
userRouter.get("/signup", userControllers.signup);
userRouter.get("/login", userControllers.loggedUser);

module.exports = userRouter;