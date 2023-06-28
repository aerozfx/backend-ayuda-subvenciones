const express = require("express");
const {
  getAllGrants,
  createOneGrant,
  updateOneGrant,
  deleteOneGrant,
} = require("../controllers/grantsApiControllers");
const grantRouter = express.Router();

grantRouter.post("/ads", createOneGrant);
grantRouter.patch("/ads/:id?", updateOneGrant);
grantRouter.get("/ads/:id?", getAllGrants);

module.exports = grantRouter;