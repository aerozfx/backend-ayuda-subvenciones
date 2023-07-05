/**
 * @exports routes
 * @namespace favoriteApiController
 */
const favorites = require("../models/favorites.js");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../utils/auxFunctions.js");

/**
 * @memberof favoriteApiController
 * @method addFavorite
 * @async
 * @param {Object} req Objeto de petición HTTP
 * @param {Object} res Objeto de respuesta HTTP
 * @return {number} Número de entries creadas
 * @throws {error}
 */
const addFavorite = async (req, res) => {
  try {
    let { id } = req.body;
    let { user_id } = verifyToken(req);
    let dbResponse = await favorites.getFavoritesByUserId(user_id);
    let favId = dbResponse.map((ele) => {
      let { favorite_id } = ele;
      return favorite_id;
    });
    if (favId.includes(+id)) {
      res.status(302).json({
        message: "Este elemento ya está relacionado con el usuario",
      });
    } else {
      let result = await favorites.addFavorite({
        favorite_id: req.body.id,
        user_id: user_id,
      });
      res.status(200).json({
        message: `El elemento con favorite_id: ${req.body.id} ha sido añadido`,
      });
    }
    return result;
  } catch (error) {
    console.error(error);
  }
};

/**
 * @memberof favoriteApiController
 * @method deleteFavorite
 * @async
 * @param {Object} req Objeto de petición HTTP
 * @param {Object} res Objeto de respuesta HTTP
 * @return {json} Mensaje con la subvención borrada
 * @throws {error}
 */
const deleteFavorite = async (req, res) => {
  try {
    let token = req.cookies["access-token"];
    let userData = jwt.verify(token, "secret_key");
    let result = await favorites.removeFavorite({
      favorite_id: req.params.id,
      user_id: userData.user_id,
    });
    res.status(200).json({
      message: `El elemento con favorite_id: ${req.body.favorite_id} ha sido removido de su lista de favoritos`,
    });
    return result;
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

/**
 * @memberof favoriteApiController
 * @method getFavorites
 * @async
 * @param {Object} req Objeto de petición HTTP
 * @param {Object} res Objeto de respuesta HTTP
 * @return {json} Objeto con todas las entries encontradas
 * @throws {error}
 */
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

/**
 * @memberof favoriteApiController
 * @method getFavoritesByUserId
 * @async
 * @param {Object} req Objeto de petición HTTP
 * @param {Object} res Objeto de respuesta HTTP
 * @return {json} Objeto con todas las entries encontradas
 * @throws {error}
 */

const getFavoritesByUserId = async (req, res) => {
  try {
    let token = jwt.verify(req.cookies[("access-token", "secret_key")]);
    let data = await favorites.getFavoritesByUserId(token.user_id);
    res.send("bien");
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
};
module.exports = {
  addFavorite,
  deleteFavorite,
  getFavorites,
  getFavoritesByUserId,
};
