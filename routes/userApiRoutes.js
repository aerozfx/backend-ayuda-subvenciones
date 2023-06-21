const express = require("express");
const { createUser, deleteUser, updateUser, loginUser } = require("../controllers/usersController.js");
const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.post("/login", loginUser);
userRouter.put("/", updateUser);
userRouter.delete("/", deleteUser);


module.exports = userRouter