const jwt = require("jsonwebtoken");
const users = require("../models/users");
const bcrypt = require("bcrypt");

const checkUser = async (req, res, next) => {
  if (req.body.email !== "" && req.body.password !== "") {
    let { email, password } = req.body;
    let user = await users.getUserByEmail(email);
    let result = await bcrypt.compare(password, user[0].password);
    if (result) {
      let { role } = user[0];
      console.log(user[0]);
      const payload = {
        authorised: true,
        role: role || "user",
        user_id: user[0].user_id,
      };
      let token = jwt.sign(payload, "secret_key", {
        expiresIn: "10m",
      });
      res.cookie("access-token", token, {
        httpOnly: true,
        sameSite: "strict",
      });
      next();
    } else {
      res.send("No coinciden los datos");
    }
  } else {
    res.status(200).send("Debes rellenar los campos");
  }
};
const checkCookie = (req, res, next) => {
  try {
    let token = jwt.verify(req.cookies["access-token"], "secret_key");
    console.log("has accedido con token " + token);
    if (token) next();
  } catch (error) {
    res.send("no hay cookie");
  }
};
const auth = (req, res, next) => {
  let token = req.cookies["access-token"];
  console.log(token);
  if (!token) {
    return res.send("no hay token");
  }
  try {
    const data = jwt.verify(token, "secret_key");
    req.userId = data.id;
    req.userRole = data.role;
    return next();
  } catch {
    return res.sendStatus(403);
  }
};

module.exports = { checkUser, auth, checkCookie };
