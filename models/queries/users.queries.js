const db_users_queries = {
  getUsers: `SELECT * from users`,
  getOneUser: `SELECT * from users WHERE email = $1`,
  createUser: `
  INSERT INTO users 
  (name, surname, email, password, role) 
  VALUES($1, $2, $3, $4, $5)`,
  deleteUser: `DELETE FROM users WHERE email=$1`,
  updateUser: `
  UPDATE users 
  SET name=$1, surname=$2, email=$3, password=$4, role=$5
  WHERE email=$6`,
};

module.exports = db_users_queries;
