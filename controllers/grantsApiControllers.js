const Grant = require('../models/grants');

const createOneGrant = async (req, res) => {
    const dataGrant = req.body;
    try {
        const response = await new Grant(dataGrant);
        let answer = await response.save()
        res.status(201).json({
            msj: `Subencion ${answer.title} guardado en el sistema con ID: ${answer.id}`
        });
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({
            msj: `ERROR: ${error}`
        });
    }
}

const getAllGrants = async () => {
    try {
        let grants = await Grant.find({});
        res.status(200)
        res.status(200).render('grants.pug', { "grants": [grants], msj: "un productouna subencion" });
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({
            msj: `ERROR: ${error}`
        });
    }
}

const deleteOneGrant = async () => {
    try {

    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({
            msj: `ERROR: ${error}`
        });
    }
}

const getOneGrant = async (req, res) => {
    try {
        let grants = await Grant.find({ id: req.params.id });
        res.status(200).json(grants[0])
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({
            msj: `ERROR: ${error}`
        });
    }
}

const updateOneGrant = async (req, res) => {
    const updatedGrant = req.body
    try {
        // modificar un elemento elegido
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({
            msj: `ERROR: ${error}`
        });
    }
}


module.exports = {
    createOneGrant,
    getAllGrants,
    deleteOneGrant,
    getOneGrant,
    updateOneGrant
}