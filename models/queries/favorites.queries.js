const db_favorites_queries = {
  createFavorite: `
    INSERT INTO favorites (id_user, id_favorite)
    VALUES ($1, $2)
    `,
  deleteFavorite: `
    DELETE FROM favorite 
    WHERE id_favorite = $1`,
  getAllFavorites: `
    SELECT *
    FROM favorite`,
};

module.exports = db_favorites_queries;
