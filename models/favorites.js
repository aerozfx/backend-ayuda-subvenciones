const pool = require("../utils/db-sql-favorites");
const db_favorites_queries = require("./queries/favorites.queries");

const addFavorite = async (data) => {
  let { favorite_id, user_id } = data;
  let client, result;
  try {
    client = await pool.connect();
    let data = await client.query(db_favorites_queries.addFavorite, [
      favorite_id,
      user_id,
    ]);
    result = data.rows;
  } catch (error) {
    throw error;
  }
  return result;
};

const removeFavorite = async (id) => {
  let client, result;
  try {
    client = await pool.connect();
    let data = await client.query(db_favorites_queries.deleteFavorite, [id]);
    result = data.rows;
  } catch (error) {
    throw error;
  }
  return result;
};

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

const favorites = {
  addFavorite,
  removeFavorite,
  getFavorites,
};
module.exports = favorites;
