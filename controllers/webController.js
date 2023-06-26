const grant = require("../models/grants");
const favorites = require("../models/favorites");
const user = require("../models/users");
const jwt = require("jsonwebtoken");

let authorised;
let userType;
let userEmail;

// function setSessionValues(credential, user, email) {
//   authorised = credential;
//   userType = user;
//   userEmail = email;
// }
// setSessionValues(true, "user", "aeroadsad@gmail.com");

const homePageController = async (req, res) => {
  let token = req.cookies["access-token"];
  try {
    if (req.user || token) {
      let userData = jwt.verify(token, "secret_key");
      const paramRegex = /^(?!.*[!@#$%^&*()\-=_+[{}\]|;':",.<>/?\\~` nullfalse""undefined]])((?![a-zA-Z0-9]).).*$/i;
      let links = { "/profile": "perfil", "/favorites": "favoritos", "/logout": "salir" };
      console.log(userData);
      let role = userData.role || "user";
      if (role === "user") {
        let links = {
          "/profile": "perfil",
          "/favorites": "favoritos",
          "/logout": "salir",
        };
        const searchParam = req.query.search;
        if (
          searchParam 
          && searchParam.trim() !== "" 
          && !paramRegex.test(searchParam) 
          && typeof searchParam === "string"
        ) {
          const grants = await grant.find({});
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
            scrapingData: matchingGrants,
          });
        } else {
          res.render("home", {
            page_title: "home",
            navBar_links: links,
          });
        }
      } else if (role === "admin") {
        let links = {
          "/users": "usuarios",
          "/grants": "subvenciones",
          "/logout": "salir",
        };
        res.render("homeAdmin", {
          page_title: "home",
          navBar_links: links,
        });
      }
    } else {
      res.render("homeWeb", { page_title: "F.A.M Pyme" });
    }
  } catch (error) {
    res.status(400).json({ msj: `ERROR ${error}` });
  }
};
const favoritesPageController = async (req, res) => {
  try {
    let token = req.cookies["access-token"];
    let userData = jwt.verify(token, "secret_key");
    let links = { "/": "inicio", "/profile": "perfil", "/logout": "salir" };
    let favoritesResult = await favorites.getFavoritesByUserId(
      userData.user_id
    );
    if (favoritesResult.length > 0) {
      res.render("favorites", {
        page_title: "favoritos",
        navBar_links: links,
        favorites: favoritesResult,
      });
    } else {
      res.send("no hay favoritos");
    }
  } catch (error) {
    res.status(400).json({ msj: `ERROR ${error}` });
  }
};

const profilePageController = async (req, res) => {
  try {
    let links = {
      "/": "inicio",
      "/favorites": "favoritos",
      "/logout": "salir",
    };
    let currentUser = await user.getUserByEmail(userEmail);
    res.render("profile", {
      page_title: "perfil",
      navBar_links: links,
      current_user: currentUser,
    });
  } catch (error) {
    res.status(400).json({ msj: `ERROR ${error}` });
  }
};

const usersListController = async (req, res) => {
  try {
    let links = {
      "/": "inicio",
      "/grants": "subvenciones",
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

const grantsListController = async (req, res) => {
  try {
    let links = { "/": "inicio", "/users": "usuarios", "/logout": "salir" };
    const grants = await grant.find({});
    if (grants) {
      res.render("grants", {
        page_title: "subvenciones",
        navBar_links: links,
        grantsAmount: grants.length,
        grants,
      });
    } else {
      res.render("grants", {
        page_title: "subvenciones",
        navBar_links: links,
        grantsAmount: grants.length,
      });
    }
  } catch (error) {
    res.status(400).json({ msj: `ERROR ${error}` });
  }
};

const signupPageController = (req, res) => {
  try {
    res.status(200).render("signup");
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const loginPageController = (req, res) => {
  try {
    res.status(200).render("login");
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const logoutPageController = (req, res) => {
  try {
    res.status(200).render("homeWeb");
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports = {
  signupPageController,
  homePageController,
  profilePageController,
  favoritesPageController,
  usersListController,
  grantsListController,
  loginPageController,
  logoutPageController,
};
