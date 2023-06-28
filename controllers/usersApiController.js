const users = require("../models/users.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  const data = req.body;
  if (!data.password) {
    data.password = "1";
    bcrypt.hash(data.password, 15, async (err, hash) => {
      data.password = hash;
    });
  }
  if (data.role == null) {
    data.role = "user";
  }

  try {
    bcrypt.hash(data.password, 15, async (err, hash) => {
      data.password = hash;
      let result = await users.createUser(data);

      let response = await fetch(
        `${process.env.PRODUCTION_DOMAIN}/api/users/${data.email}`
      );
      let userData = await response.json();
      const payload = {
        authorised: true,
        role: data?.role || "user",
        email: data.email,
        user_id: userData[0].user_id,
      };
      let token = jwt.sign(payload, "secret_key", {
        expiresIn: "30m",
      });

      res.cookie("access-token", token, {
        httpOnly: true,
        sameSite: "strict",
      });
      res.status(201).redirect("/");
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};
const updateUser = async (req, res) => {
  try {
    let data = req.body;
    let token = jwt.verify(req.cookies["access-token"], "secret_key");

    let { newName, newSurname, newEmail, newPassword, newRole } = data;
    newRole = newRole || "user";
    let { email } = token;
    bcrypt.hash(newPassword, 15, async (err, hash) => {
      newPassword = hash;
      let result = await users.updateUser({
        newName,
        newSurname,
        newEmail,
        newPassword,
        newRole,
        email,
      });
      if (newEmail != email) {
        const payload = {
          authorised: true,
          role: newRole,
          email: newEmail,
          user_id: token.user_id,
        };
        res.clearCookie("access-token");
        let newToken = jwt.sign(payload, "secret_key");
        res.cookie("access-token", newToken, {
          httpOnly: true,
          sameSite: "lax",
        });
      }
      res.status(200).redirect("/profile");
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

const loginUser = (req, res) => {
  try {
    res.status(200).redirect("/");
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

const getUsers = async (req, res) => {
  let result;
  if (req.params.email) {
    try {
      result = await users.getUserByEmail(req.params.email);
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

const apiDocs = (req, res) => {
  res.send("Aquí irá la docu de la API");
};

const generateToken = (req, res) => {
  try {
    const payload = {
      rol: "guest",
    };
    let token = jwt.sign(payload, "secret_key", {
      expiresIn: "5m",
    });
    res.cookie("access-token", token, {
      httpOnly: true,
    });
    res.status(200).redirect("/");
  } catch (error) {
    console.log(error.stack);
  }
};
module.exports = {
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  getUsers,
  generateToken,
  apiDocs,
};
