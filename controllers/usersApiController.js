/**
 * @author Fer y Alvaro
 * @exports routes 
 * @namespace UserApiController 
 */

const users = require("../models/users.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/** 
* @memberof UserApiController 
* @method createUser 
* @async 
* @param {Object} req objeto de petición HTTP
* @param {Object} res objeto de respuesta HTTP
* @return {number} numero de entries creadas
* @throws {error} 
*/

const createUser = async (req, res) => {
  const data = req.body;
  console.log(data);
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
    });
    res.status(201).redirect("/");
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

/** 
* @memberof UserApiController 
* @method updateUser 
* @async 
* @param {Object} req objeto de petición HTTP
* @param {Object} res objeto de respuesta HTTP
* @return {json} objeto con las entries encontradas
* @throws {error} 
*/

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
    });
    res.status(200).redirect("/profile");
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

/** 
* @memberof UserApiController 
* @method deleteUser 
* @async 
* @param {Object} req objeto de petición HTTP
* @param {Object} res objeto de respuesta HTTP
* @return {number} Mensaje con el user borrado
* @throws {error} 
*/

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

/** 
* @memberof UserApiController 
* @method loginUser 
* @async 
* @param {Object} req objeto de petición HTTP
* @param {Object} res objeto de respuesta HTTP
* @return {json} redirige a pagina de inicio
* @throws {error} 
*/

const loginUser = (req, res) => {
  try {
    res.status(200).redirect("/");
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

/** 
* @memberof UserApiController 
* @method getUsers 
* @async 
* @param {Object} req objeto de petición HTTP
* @param {Object} res objeto de respuesta HTTP
* @return {json} Objeto con todas las entries encontradas
* @throws {error} 
*/

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
module.exports = { createUser, updateUser, deleteUser, loginUser, getUsers };
