const Grant = require("../models/grants");
const favorites = require("../models/favorites");
const user = require("../models/users");
const jwt = require("jsonwebtoken");

const homePageController = async (req, res) => {
  try {
    if (req.cookies["access-token"]) {
      let token = req.cookies["access-token"];
      let userData = jwt.verify(token, "secret_key");
      const paramRegex =
        /^(?!.*[!@#$%^&*()\-=_+[{}\]|;':",.<>/?\\~` nullfalse""undefined]])((?![a-zA-Z0-9]).).*$/i;
      let role = userData?.role || "user";
      console.log(userData);
      if (role === "user") {
        let links = {
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
            scrapingData: matchingGrants,
            authorised: userData.authorised,
          });
        } else {
          res.render("home", {
            page_title: "home",
            navBar_links: links,
            authorised: userData.authorised,
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
    let token = jwt.verify(req.cookies["access-token"], "secret_key");
    if (token) {
      let links = {
        "/": "inicio",
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
    const grants = await Grant.find({});

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

const dashboardController = (req, res) => {
  try {
    res.status(200).render("dashboard", { page_title: "dashboard" });
    //pasarle la bd de grants y de users
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

const createGrant = (req, res) => {
  try {
    let grant = new Grant({
      id: Number(req.body.id),
      mrr: req.body.mrr,
      admin: req.body.admin,
      dep: req.body.dep,
      date: req.body.date,
      title: req.body.title,
      title_co: req.body.title_co,
      assignedTo: "", //esta misma linea estaba en el scrapper
      link: req.body.link,
    });
    grant.save();
    res.status(201).redirect("/dashboard");
  } catch (error) {
    throw new error();
  }
};

const deleteGrant = async (req, res) => {
  /*  try {
     const deleteGrant = await Grant.deleteOne({ id: { $in: [req.params.id] } });
     res.status(200).json(deleteGrant);
   } catch (error) {
     console.log(`ERROR: ${error.stack}`);
     res.status(400).json({
       msj: `ERROR: ${error}`,
     });
   } */
};

module.exports = {
  signupPageController,
  homePageController,
  profilePageController,
  favoritesPageController,
  usersListController,
  grantsListController,
  dashboardController,
  createGrant,
  deleteGrant,
  loginPageController,
  logoutPageController,
};
