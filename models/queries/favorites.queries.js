const db_favorites_queries = {
  addFavorite: `
    INSERT INTO favorites (id_user, id_favorite)
    VALUES ($1, $2)
    `,
  deleteFavorite: `
    DELETE FROM favorites
    WHERE id_favorite = $1`,
  getAllFavorites: `
    SELECT *
    FROM favorites`,
};

module.exports = db_favorites_queries;
