const express = require("express");
const favoriteRouter = express.Router();
const favoritesController = require("../controllers/favoritesController");

//favoriteRouter.get("/favorites", favoritesController.getFavorites);
favoriteRouter.post("/api/favorites", favoritesController.createUsersFavorite);
favoriteRouter.delete("/api/favorites/:id?", favoritesController.deleteFavorite);

module.exports = favoriteRouter;
