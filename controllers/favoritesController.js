const Favorite = require("../models/favorites.js")

const createUsersFavorite = (req, res) => {
    try { //ocurre cuando se le da al boton de darle a favorito
        res.status(201).json({
            msj: "Esto funciona"
        })
    } catch (error) {
        res.status(400).json({
            message: error
        })
    }
}

const deleteFavorite = async (req, res) => {
    grant = req.params
    try {
        /* res.status(200).json({
            msj: "Esto funciona"
        }) */
        //ESTO ME LLEVA AL MODEL
        const favorite = req.params.id;
        const response = await Favorite.deleteGrant(favorite);

        res.status(200).sendStatus(204);
        return response

    } catch (error) {
        res.status(400).json({
            message: error
        })
    }
}
/*
const getFavorites = async (req, res) => {
    try {
        res.status(200).render('favorites.pug')

    } catch (error) {
        res.status(404).json({
            message: error
        })
    }
}
*/
module.exports = {
    createUsersFavorite,
    deleteFavorite,

}