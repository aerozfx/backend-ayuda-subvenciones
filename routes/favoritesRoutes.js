const express = require("express");
const favoriteRouter = express.Router();
const favoritesController = require('../controllers/favoritesController');

favoriteRouter.post("/", favoritesController.createFavorite);
favoriteRouter.delete("/", favoritesController.deleteFavorite);
favoriteRouter.get("/", favoritesController.getFavorites);

module.exports = favoriteRouter;