const Grant = require("../models/grants");

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
    res.status(200).json({ message: `Subvención con id ${req.params.id} se ha borrado correctamente` })

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

const createGrant = (req, res) => {
  try {
    let grant = new Grant({
      id: Number(req.body.id),
      mrr: req.body.mrr,
      admin: req.body.admin,
      dep: req.body.dep,
      date: req.body.date,
      title: req.body.title,
      title_co: req.body.title_co,
      assignedTo: '',
      link: req.body.link
    });
    grant.save()
    res.status(201).redirect('/dashboard');
  } catch (error) {
    throw new error
  }
}

module.exports = {
  getAllGrants,
  deleteOneGrant,
  updateOneGrant,
  createGrant
};
