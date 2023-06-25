const express = require("express");
const {
  createUser,
  deleteUser,
  updateUser,
  loginUser,
  getUsers,
} = require("../controllers/usersController.js");
const { checkUser } = require("../middlewares/loginHandler.js");
const userRouter = express.Router();

userRouter.post("/user", createUser);
userRouter.post("/login", checkUser, loginUser);
userRouter.put("/user", updateUser);
userRouter.delete("/user", deleteUser);
// userRouter.get("/:email?", getUsers);

module.exports = userRouter;
