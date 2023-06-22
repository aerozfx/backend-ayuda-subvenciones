const pool = require("../utils/db-sql-favorites");
const db_favorites_queries = require("./queries/favorites.queries");

const addFavorite = async (id) => {
  let client, result;
  try {
    client = await pool.connect();
    let data = await client.query(db_favorites_queries.createFavorite, [id]);
    result = data.rows;
  } catch (error) {}
};
