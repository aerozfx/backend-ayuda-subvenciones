const { Pool } = require("pg");
require("dotenv").config();
const pool = new Pool({
  user: process.env.PG_USER_FAVORITE,
  host: process.env.PG_HOST_FAVORITE,
  database: process.env.PG_DATABASE_FAVORITE,
  password: process.env.PG_PASSWORD_FAVORITE,
});

module.exports = pool;
