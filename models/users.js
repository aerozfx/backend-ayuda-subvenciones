const db_users_queries = require("./queries/users.queries.js");
const pool = require("../utils/db-sql.js");

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

const updateUser = async (data) => {
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

const loginUser = async (data) => {
  console.log(getUserByEmail(data.email));
};
const users = {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  getUserByEmail,
  loginUser,
};

module.exports = users;
