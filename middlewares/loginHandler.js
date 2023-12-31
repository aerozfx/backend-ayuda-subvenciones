const jwt = require("jsonwebtoken");
const users = require("../models/users");
const bcrypt = require("bcrypt");

const checkUser = async (req, res, next) => {
  if (req.body.email !== "" && req.body.password !== "") {
    let { email, password } = req.body;
    let user = await users.getUserByEmail(email);
    let result = await bcrypt.compare(password, user[0].password);
    if (result) {
      let { role, email, user_id } = user[0];
      const payload = {
        authorised: true,
        role: role || "user",
        email,
        user_id,
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
    if (token.role == "user") {
      next();
    } else {
      res.redirect("/");
    }
  } catch (error) {
    res.status(404).render("404");
    res.status(401).redirect("/login");
  }
};
const checkRole = (req, res, next) => {
  try {
    let token = jwt.verify(req.cookies["access-token"], "secret_key");
    if (token.role == "admin") {
      next();
    } else {
      res.redirect("/");
    }
  } catch (error) {
    res.status(404).render("404");
  }
};

module.exports = { checkUser, checkRole, checkCookie };
