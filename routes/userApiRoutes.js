const express = require("express");
const {
  createUser,
  deleteUser,
  updateUser,
  loginUser,
  getUsers,
} = require("../controllers/usersApiController.js");
const userRouter = express.Router();

userRouter.post("/user", createUser);
userRouter.post("/login", loginUser);
userRouter.put("/user", updateUser);
userRouter.delete("/user", deleteUser);
// userRouter.get("/:email?", getUsers);

module.exports = userRouter;
