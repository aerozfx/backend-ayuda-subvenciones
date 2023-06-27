const Grant = require("../models/grants");
//const formValues = require('../public/script');
//const scrappy = require('../utils/scrapper');

const getAllGrants = async (req, res) => {
  if (req.params.id) {
    let grants = await Grant.find({ id: req.params.id });
    res.status(200).json(grants);
  } else {
    try {
      let grants = await Grant.find({});
      res.status(200).json(grants);
    } catch (error) {
      res.status(400).json({
        msj: `ERROR: ${error}`,
      });
    }
  }
};

const deleteOneGrant = async (req, res) => {
  try {
    const deleteGrant = await Grant.deleteOne({ id: { $in: [req.params.id] } });
    res.status(200).json(deleteGrant);
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    res.status(400).json({
      msj: `ERROR: ${error}`,
    });
  }
};

const updateOneGrant = async (req, res) => {
  const updatedGrant = req.body;
  const id = { id: req.params.id };
  try {
    const editedGrant = await Grant.findOneAndUpdate(id, updatedGrant);
    res.json(editedGrant);
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    res.status(400).json({
      msj: `ERROR: ${error}`,
    });
  }
};

module.exports = {
  getAllGrants,
  deleteOneGrant,
  updateOneGrant,
};
