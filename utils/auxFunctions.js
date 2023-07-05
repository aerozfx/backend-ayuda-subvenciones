const jwt = require("jsonwebtoken");
const verifyToken = (req) => {
  let token = req.cookies["access-token"];
  return jwt.verify(token, "secret_key");
};

const formatData = () => {};

module.exports = {
  verifyToken,
};
