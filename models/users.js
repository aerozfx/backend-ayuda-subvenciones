/**
 * @exports routes 
 * @namespace users_model 
 */

const db_users_queries = require("./queries/users.queries.js");
const pool = require("../utils/db-sql-users.js");

/** 
* @memberof users_model
* @method getUserByEmail 
* @async 
* @param {string} email email de usuario
* @return {Object} Objeto del usuario que coincide con el email dado por paramtros
* @throws {error} 
*/

const getUserByEmail = async (email) => {
  let client, result;
  try {
    client = await pool.connect();
    const data = await client.query(db_users_queries.getOneUser, [email]);
    result = data.rows;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    client.release();
  }
  return result;
};

/** 
* @memberof users_model
* @method getUsers 
* @async 
* @return {Object} retorna un objeto con todos los usuarios
* @throws {error} 
*/
const getUsers = async () => {
  let client, result;
  try {
    client = await pool.connect();
    const data = await client.query(db_users_queries.getUsers);
    result = data.rows;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    client.release();
  }
  return result;
};

/** 
* @memberof users_model
* @method createUser 
* @async 
* @param {Object} data Objeto con los datos del usuario
* @return {Object} objeto del usuario creado
* @throws {error} 
*/
const createUser = async (data) => {
  let { email, name, surname, password, role } = data;
  let client, result;
  try {
    client = await pool.connect();
    const data = await client.query(db_users_queries.createUser, [
      name,
      surname,
      email,
      password,
      role,
    ]);
    result = data.rows;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    client.release();
  }
  return result;
};

/** 
* @memberof users_model
* @method updateUser 
* @async 
* @param {Object} data id de subvencion favorita y id de usuario
* @return {Object} Objeto del usuario modificado
* @throws {error} 
*/
const updateUser = async (data) => {
  console.log(data);
  let { newName, newSurname, newEmail, newPassword, newRole, email } = data;
  let client, result;
  try {
    client = await pool.connect();
    const data = await client.query(db_users_queries.updateUser, [
      newName,
      newSurname,
      newEmail,
      newPassword,
      newRole,
      email,
    ]);
    result = data.rows;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    client.release();
  }
  return result;
};

/** 
* @memberof users_model
* @method deleteUser 
* @async 
* @param {string} email email de usuario 
* @return {Object} devuelve el objeto actualizado despues de eliminar la subvencion favorita elegida 
* @throws {error} 
*/
const deleteUser = async (email) => {
  let client, result;
  try {
    client = await pool.connect();
    const data = await client.query(db_users_queries.deleteUser, [email]);
    result = data.rows;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    client.release();
  }
  return result;
};


const users = {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  getUserByEmail,
};

module.exports = users;
