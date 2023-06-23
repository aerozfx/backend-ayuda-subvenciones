const Grant = require('../models/grants');
//const scrappy = require('../utils/scrapper'); //headless para que no de por culo

const createOneGrant = async (req, res) => {
    dataGrant = req.body

    try {

        const response = await Grant.insertMany(dataGrant);
        let answer = await response.save()
        res.json(dataGrant)
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

const getAllGrants = async (req, res) => {
    try {
        let grants = await Grant.find({});
        // res.status(200).render('grants.pug', { "grants": [grants], msj: "una subencion" });

    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({
            msj: `ERROR: ${error}`
        });
    }
}

const deleteOneGrant = async (req, res) => {
    const { grantTitle } = req.params
    try {
        const deleteGrant = await Client.findByIdAndDelete(grantTitle);
        res.json(deleteGrant);
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
        res.status(200).json(grants[0]);
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(404).json({
            msj: `ERROR: ${error}`
        });
    }
}

const updateOneGrant = async (req, res) => {
    const updatedGrant = req.body
    const { grantTitle } = req.params
    const query = { titulo: grantTitle }
    try {
        const editedGrant = await Grant.findOneAndUpdate(query, updatedGrant, { new: true });
        res.json(editedGrant);
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