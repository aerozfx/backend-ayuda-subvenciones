const jwt = require("jsonwebtoken");
const users = require("../models/users");
const bcrypt = require("bcrypt");

const checkUser = async (req, res, next) => {
  if (true) {
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
      let error = {
        message: "Email o password incorrectos",
      };
      res.cookie("error", error).redirect("/login");
    }
  } else {
    let error = {
      message: "Debes rellenar ambos campos",
    };
    res.cookie("error", error).redirect("/login");
  }
};
const checkCookie = (req, res, next) => {
  try {
    let token = jwt.verify(req.cookies["access-token"], "secret_key");
    if (token.role === "user" || token.role === "admin") {
      console.log(token);
      next();
    } else {
      res.redirect("/");
    }
  } catch (error) {
    res.redirect("/not-found");
  }
};
const checkAdminRole = (req, res, next) => {
  try {
    let token = jwt.verify(req.cookies["access-token"], "secret_key");
    if (token.role == "admin") {
      next();
    }
  } catch (error) {
    res.status(403).render("forbidden");
  }
};

module.exports = { checkUser, checkAdminRole, checkCookie };
