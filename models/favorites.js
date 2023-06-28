/**
 * @exports routes 
 * @namespace favorites_model 
 */

const pool = require("../utils/db-sql-favorites");
const db_favorites_queries = require("./queries/favorites.queries");


/** 
* @memberof favorites_model 
* @method addFavorite 
* @async 
* @param {Object} data id de subvencion favorita y id de usuario
* @return {Object} Objeto de la subvencion favorita
* @throws {error} 
*/
const addFavorite = async (data) => {
  let { favorite_id, user_id } = data;
  let client, result;
  try {
    client = await pool.connect();
    let data = await client.query(db_favorites_queries.addFavorite, [
      +favorite_id,
      user_id,
    ]);
    result = data.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
  return result;
};


/** 
* @memberof favorites_model 
* @method removeFavorite 
* @async 
* @param {Object} data id de subvencion favorita y id de usuario
* @return {Object} devuelve el objeto actualizado despues de eliminar la subvencion favorita elegida 
* @throws {error} 
*/
const removeFavorite = async ({ favorite_id, user_id }) => {
  let client, result;
  try {
    client = await pool.connect();
    let data = await client.query(db_favorites_queries.deleteFavorite, [
      favorite_id,
      user_id,
    ]);
    result = data.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
  return result;
};

/** 
* @memberof favorites_model 
* @method removeFavorite 
* @async 
* @return {Object} devuelve un objeto con todas las subvenciones
* @throws {error} 
*/
const getFavorites = async () => {
  let client, result;
  try {
    client = await pool.connect();
    const data = await client.query(db_favorites_queries.getAllFavorites);
    result = data.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
  return result;
};

/** 
* @memberof favorites_model 
* @method getFavoritesByUserId 
* @async 
* @param {Object} id number
* @return {Object} retorna un objeto con el usuario que tiene el id que hemos pasado por parametro
* @throws {error} 
*/
const getFavoritesByUserId = async (id) => {
  let client, result;
  try {
    client = await pool.connect();
    let data = await client.query(db_favorites_queries.getFavoritesById, [id]);
    result = data.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
  return result;
};
const favorites = {
  addFavorite,
  removeFavorite,
  getFavorites,
  getFavoritesByUserId,
};
module.exports = favorites;
