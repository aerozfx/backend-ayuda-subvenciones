const db_favorites_queries = {
  addFavorite: `
    INSERT INTO favorites (favorite_id, user_id)
    VALUES ($1, $2)
    `,
  deleteFavorite: `
    DELETE FROM favorites
    WHERE favorite_id = $1`,
  getAllFavorites: `
    SELECT *
    FROM favorites`,
};

module.exports = db_favorites_queries;
