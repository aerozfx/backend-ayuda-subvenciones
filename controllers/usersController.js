const users = require("../models/users.js");
const createUser = async (req, res) => {
  const data = req.body;
  try {
    let result = await users.createUser(data);
    res.status(201).json({
      message: `El usuario ${data.email} ha sido guardado`,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};
const updateUser = async (req, res) => {
  let data = req.body;
  try {
    let result = await users.updateUser(data);
    res.status(200).json({
      message: `El usuario ${data.email} ha sido actualizado`,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};
const deleteUser = (req, res) => {
  try {
    res.status(200).json({
      message: "Este método funciona"
    });
  } catch (error) {
    res.status(400).json({
      message: error
    });
  };
};

const loginUser = (req, res) => {
  let body = req.body
  try {
    res.status(201).json({
      message: "Este método funciona"
    });
  } catch (error) {
    res.status(200).json({
      message: error
    });
  };
};
module.exports = { createUser, updateUser, deleteUser, loginUser, getUsers };
