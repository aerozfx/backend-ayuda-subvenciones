const favorites = require("../models/favorites.js");

const addFavorite = async (req, res) => {
  try {
    let result = await favorites.addFavorite(req.body);
    res.status(200).json({
      message: `El elemento con favorite_id: ${req.body.favorite_id} ha sido añadido`,
    });
    return result;
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

// const deleteFavorite = async (req, res) => {
//   try {
//     let result = await favorites.removeFavorite(req.query.id);
//     // res.status(200).json({
//     //   message: `El elemento con favorite_id: ${req.body.favorite_id} ha sido añadido`,
//     // });
//     return result;
//   } catch (error) {
//     res.status(400).json({
//       message: error,
//     });
//   }
// };

const getFavorites = async (req, res) => {
  try {
    let data = await favorites.getFavorites();
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
};

module.exports = {
  addFavorite,
  // deleteFavorite,
  getFavorites,
};
