require("dotenv").config();
/**
 * @exports routes
 * @namespace webController
 */

const Grant = require("../models/grants");
const favorites = require("../models/favorites");
const user = require("../models/users");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../utils/auxFunctions");

/**
 * @memberof webController
 * @method homePageController
 * @async
 * @param {Object} req Objeto de petición HTTP
 * @param {Object} res Objeto de respuesta HTTP
 * @return {render} renderiza la pagina home en base a quien esté logeado
 * @throws {error}
 */

const homePageController = async (req, res) => {
  try {
    res.clearCookie("error");
    if (req.cookies["access-token"]) {
      let token = req.cookies["access-token"];
      let userData = jwt.verify(token, "secret_key");
      const paramRegex =
        /^(?!.*[!@#$%^&*()\-=_+[{}\]|;':",.<>/?\\~` nullfalse""undefined]])((?![a-zA-Z0-9]).).*$/i;
      let role = userData?.role || "user";
      if (role === "user" || role === "guest") {
        let links = {
          "/": "inicio",
          "/profile": "perfil",
          "/favorites": "favoritos",
          "/logout": "salir",
        };
        const searchParam = req.query.search;
        if (
          searchParam &&
          searchParam.trim() !== "" &&
          !paramRegex.test(searchParam) &&
          typeof searchParam === "string"
        ) {
          const grants = await Grant.find({});
          const searchTerms = searchParam.toUpperCase().split(" ");
          let matchingGrants = grants.filter((data) => {
            const match = searchTerms.some(
              (searchTerm) =>
                data.title?.toUpperCase().indexOf(searchTerm) !== -1
            );
            return match;
          });
          res.render("home", {
            page_title: "home",
            navBar_links: links,
            isAuthorized: userData.authorised,
            scrapingData: matchingGrants,
            authorised: userData.authorised,
          });
        } else {
          res.render("home", {
            page_title: "home",
            navBar_links: links,
            isAuthorized: userData.authorised,
          });
        }
      } else if (role === "admin") {
        let links = {
          "/": "inicio",
          "/users": "usuarios",
          "/grants": "subvenciones",
          "/dashboard": "dashboard",
          "/logout": "salir",
        };
        res.render("homeAdmin", {
          page_title: "home",
          navBar_links: links,
          isAuthorized: userData.authorised,
        });
      }
    } else {
      res.render("homeWeb", { page_title: "F.A.M Pyme" });
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * @memberof webController
 * @method favoritesPageController
 * @async
 * @param {Object} req Objeto de petición HTTP
 * @param {Object} res Objeto de respuesta HTTP
 * @return {render} Renderiza la pagina de subvenciones favoritas en funcion del usuario que esta logeado
 * @throws {error}
 */

const favoritesPageController = async (req, res) => {
  try {
    let { user_id } = verifyToken(req);
    let links = { "/": "inicio", "/profile": "perfil", "/logout": "salir" };
    let favoritesResult = await favorites.getFavoritesByUserId(user_id);
    if (favoritesResult.length > 0) {
      const favoriteIds = favoritesResult.map((favorite) => {
        let { favorite_id: id } = favorite;
        return id;
      });
      const grants = await Grant.find({ id: { $in: favoriteIds } });
      res.render("favorites", {
        page_title: "favoritos",
        navBar_links: links,
        grants,
      });
    } else {
      res.send("no hay favoritos");
    }
  } catch (error) {
    res.status(400).json({ msj: `ERROR ${error}` });
  }
};

/**
 * @memberof webController
 * @method profilePageController
 * @async
 * @param {Object} req Objeto de petición HTTP
 * @param {Object} res Objeto de respuesta HTTP
 * @return {render} Renderiza la pagina de perfil en funcion del usuario que esta logeado
 * @throws {error}
 */

const profilePageController = async (req, res) => {
  try {
    let token = jwt.verify(req.cookies["access-token"], "secret_key");
    if (token) {
      let links = {
        "/": "inicio",
        "/profile": "perfil",
        "/favorites": "favoritos",
        "/logout": "salir",
      };
      let currentUser = await user.getUserByEmail(token.email);
      if (currentUser.length > 0) {
        res.render("profile", {
          page_title: "perfil",
          navBar_links: links,
          current_user: currentUser,
        });
      } else {
        res.render("profile", {
          page_title: "perfil",
          navBar_links: links,
          token,
        });
      }
    }
  } catch (error) {
    res.status(400).json({ msj: `ERROR ${error}` });
  }
};

/**
 * @memberof webController
 * @method usersListController
 * @async
 * @param {Object} req Objeto de petición HTTP
 * @param {Object} res Objeto de respuesta HTTP
 * @return {render} Renderiza la pagina con la lista de usuarios en funcion del usuario que esta logeado
 * @throws {error}
 */

const usersListController = async (req, res) => {
  try {
    let links = {
      "/": "inicio",
      "/users": "usuarios",
      "/grants": "subvenciones",
      "/dashboard": "dashboard",
      "/logout": "salir",
    };
    let users = await user.getUsers();
    if (users) {
      res.render("users", {
        page_title: "users",
        navBar_links: links,
        usersAmount: users.length,
        users,
      });
    } else {
      res.render("users", {
        page_title: "users",
        navBar_links: links,
        usersAmount: users.length,
      });
    }
  } catch (error) {
    res.status(400).json({ msj: `ERROR ${error}` });
  }
};

/**
 * @memberof webController
 * @method grantsListController
 * @async
 * @param {Object} req Objeto de petición HTTP
 * @param {Object} res Objeto de respuesta HTTP
 * @return {render} Renderiza la pagina de subvenciones
 * @throws {error}
 */

const grantsListController = async (req, res) => {
  try {
    let links = {
      "/": "inicio",
      "/users": "usuarios",
      "/grants": "subvenciones",
      "/dashboard": "dashboard",
      "/logout": "salir",
    };
    const grants = await Grant.find({});

    if (grants) {
      res.render("grants", {
        page_title: "Subvenciones",
        navBar_links: links,
        grantsAmount: grants.length,
        grants,
      });
    } else {
      res.render("grants", {
        page_title: "Subvenciones",
        navBar_links: links,
        grantsAmount: grants.length,
      });
    }
  } catch (error) {
    res.status(400).json({ msj: `ERROR ${error}` });
  }
};

/**
 * @memberof webController
 * @method signupPageController
 * @async
 * @param {Object} req Objeto de petición HTTP
 * @param {Object} res Objeto de respuesta HTTP
 * @return {render} Renderiza la pagina para registrarse
 * @throws {error}
 */

const signupPageController = (req, res) => {
  try {
    res.status(200).render("signup");
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

/**
 * @memberof webController
 * @method loginPageController
 * @async
 * @param {Object} req Objeto de petición HTTP
 * @param {Object} res Objeto de respuesta HTTP
 * @return {render} Renderiza la pagina para hacer log in
 * @throws {error}
 */

const loginPageController = (req, res) => {
  try {
    let error = req?.cookies["error"];
    res.status(200).render("login", { error: error?.message });
  } catch (error) {
    console.log(error);
  }
};

/**
 * @memberof webController
 * @method dashboardController
 * @async
 * @param {Object} req Objeto de petición HTTP
 * @param {Object} res Objeto de respuesta HTTP
 * @return {render} Renderiza la pagina de dashboard accesible por un usuario de tipo administrador
 * @throws {error}
 */

const dashboardController = (req, res) => {
  try {
    let links = {
      "/": "inicio",
      "/grants": "subvenciones",
      "/users": "usuarios",
      "/logout": "salir",
    };
    res.status(200).render("dashboard", {
      page_title: "dashboard",
      navBar_links: links,
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

/**
 * @memberof webController
 * @method logoutPageController
 * @async
 * @param {Object} req Objeto de petición HTTP
 * @param {Object} res Objeto de respuesta HTTP
 * @return {render} Renderiza la pagina que nos muestra que hemos hecho log out
 * @throws {error}
 */

const logoutPageController = (req, res) => {
  try {
    res.status(200).render("homeWeb");
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

/**
 * @memberof webController
 * @method googleLogin
 * @async
 * @param {Object} req Objeto de petición HTTP
 * @param {Object} res Objeto de respuesta HTTP
 * @return {render} hace log in mediante nuestra cuenta de google
 * @throws {error}
 */

const googleLogin = async (req, res) => {
  let userRes = await fetch(
    `${process.env.DEVELOP_DOMAIN}/api/users/${req.user.emails[0].value}`
  );
  let response = await userRes.json();
  let { givenName: name, familyName: surname } = req.user.name;
  let email = req.user.emails[0].value;

  if (!response[0]) {
    await fetch(`${process.env.DEVELOP_DOMAIN}/api/users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, surname, email }),
    });
  }
  const payload = {
    email,
    authorised: true,
    user_id: response[0].user_id,
    name,
    surname,
    image: req.user.photos[0].value,
    role: req.user?.role || "user",
  };
  const token = jwt.sign(payload, `secret_key`, {
    expiresIn: "20m",
  });
  //Almacenamos el token en las cookies
  res.cookie("access-token", token, {
    httpOnly: true,
    sameSite: "lax",
  });
  res.status(200).redirect("/");
};

const errorPageController = (req, res) => {
  try {
    res.status(404).render("404");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signupPageController,
  homePageController,
  profilePageController,
  favoritesPageController,
  usersListController,
  grantsListController,
  dashboardController,
  loginPageController,
  logoutPageController,
  errorPageController,
  googleLogin,
};
