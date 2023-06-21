const queries = require('../queries/favoriteQueries');

const deleteAuthor = async (id) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.deleteGrant, [id])
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

const favorites = {
    deleteAuthor
}

module.exports = favorites