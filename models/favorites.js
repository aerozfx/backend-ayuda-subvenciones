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
  finally {
    client.release();
  }
  return result;
};

const removeFavorite = async ({ favorite_id, user_id }) => {
  let client, result;
  try {
    console.log("model favorite_id, user_id", favorite_id, user_id);
    client = await pool.connect();
    let data = await client.query(db_favorites_queries.deleteFavorite, [favorite_id, user_id]);
    result = data.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
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
