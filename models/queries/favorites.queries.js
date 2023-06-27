const db_favorites_queries = {
  addFavorite: `
    INSERT INTO favorites (favorite_id, user_id)
    VALUES ($1, $2)
    `,
  deleteFavorite: `
    DELETE FROM favorites
    WHERE favorite_id=$1 AND user_id=$2`,
  getAllFavorites: `
    SELECT *
    FROM favorites`,
  getFavoritesById: `
    SELECT *
    FROM favorites
    WHERE user_id=$1`,
};

module.exports = db_favorites_queries;
