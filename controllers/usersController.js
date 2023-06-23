const users = require("../models/users.js");
const { getUserByEmail } = require("../utils/fetchUserByEmail.js");

const createUser = async (req, res) => {
  const data = req.body;
  if (data.role == null) {
    data.role = "user";
  }
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
    await users.deleteUser(email);
    res.status(200).json({
      message: `El usuario ${email} ha sido borrado`,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

const loginUser = async (req, res) => {
  let credentials = req.body;
  console.log(credentials);
  try {
    let response = await getUserByEmail(credentials.email);
    console.log(response);
    if (
      response.email == credentials.email &&
      response.password == credentials.password
    ) {
      // res.status(200).render("home");
      res.status(200).send("las credenciales coinciden");
    } else {
      res.status(200).send("Los datos no coinciden");
    }
  } catch (error) {
    res.status(200).json({
      message: "hola",
    });
  }
};

const getUsers = async (req, res) => {
  let result;
  if (req.query.email) {
    try {
      result = await users.getUserByEmail(req.query.email);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({
        message: error,
      });
    }
  } else {
    try {
      result = await users.getUsers();
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({
        message: error,
      });
    }
  }
  return result;
};
module.exports = { createUser, updateUser, deleteUser, loginUser, getUsers };
