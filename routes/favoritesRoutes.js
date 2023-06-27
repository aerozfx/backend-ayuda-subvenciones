const express = require("express");
const favoriteRouter = express.Router();
const favoritesController = require("../controllers/favoritesApiController");

favoriteRouter.get("/favorites", favoritesController.getFavorites);
favoriteRouter.post("/api/favorites", favoritesController.addFavorite);
favoriteRouter.delete(
  "/api/favorites/:id?",
  favoritesController.deleteFavorite
);

module.exports = favoriteRouter;
