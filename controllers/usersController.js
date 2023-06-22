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
const deleteUser = async (req, res) => {
  let email = req.query.email;
  try {
    let row = await users.getUserByEmail(email);
    if (row) {
      let result = await users.deleteUser(email);
      res.status(200).json({
        message: `El usuario ${email} ha sido borrado`,
      });
    } else {
      res.status(400).json({
        message: "No existe el usuario",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

const getUsers = async (req, res) => {
  if (req.query.email) {
    let email = req.query.email;
    try {
      let result = await users.getUserByEmail(email);
      res.status(200).json(result);
    } catch (err) {}
  } else {
    try {
      let result = await users.getUsers();
      res.status(200).json(result);
    } catch (error) {}
  }
};

const loginUser = (req, res) => {
  try {
    res.status(200).json({
      message: "Este método funciona",
    });
  } catch (error) {
    res.status(200).json({
      message: error,
    });
  }
};
module.exports = { createUser, updateUser, deleteUser, loginUser, getUsers };
