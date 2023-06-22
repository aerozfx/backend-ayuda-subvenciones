const favorite = require("../models/favorites.js");
const pool = require("../utils/db-sql-favorites.js");

const createFavorite = (req, res) => {
  let client, result;
  try {
    client = pool.connect();
    //ocurre cuando se le da al boton de darle a favorito
    res.status(201).json({
      msj: "Esto funciona",
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

const deleteFavorite = (req, res) => {
  try {
    res.status(200).json({
      msj: "Esto funciona",
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

const getFavorites = async () => {
  try {
    /*      let favorites = await Favorite.find({});
             res.status(200).json(favorites); */
    res.status(200).render("favorites.pug");
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
};

module.exports = {
  createFavorite,
  deleteFavorite,
  getFavorites,
};
