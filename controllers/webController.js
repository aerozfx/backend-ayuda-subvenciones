const grant = require("../models/grants");
const favorites = require("../models/favorites");
const user = require("../models/users");

const authorised = true;

const homePageController = async (req, res) => {
  try {
    if (authorised) {
      const searchParam = req.query.search;

      if (searchParam) {
        const grants = await grant.find({});
        const searchTerms = searchParam.toUpperCase().split(" ");
        let matchingGrants = grants.filter((data) => {
          const match = searchTerms.some(
            (searchTerm) => data.title.toUpperCase().indexOf(searchTerm) !== -1
          );
          return match;
        });
        res.render("home", {
          page_title: "home",
          authorised,
          scrapingData: matchingGrants,
        });
      } else {
        res.render("home", { page_title: "home", authorised });
      }
    } else {
      res.render("homeWeb", { page_title: "F.A.M Pyme", authorised });
    }
  } catch (error) {
    res.status(400).json({ msj: `ERROR ${error}` });
  }
};

const favoritesPageController = async (req, res) => {
  try {
    let favoritesResult = await favorites.getFavorites();
    if (favoritesResult) {
      res.render("favorites", {
        page_title: "favoritos",
        favorites: favoritesResult  ,
      });
    }
  } catch (error) {}
};

const profilePageController = (req, res) =>
  res.render("profile", { page_title: "perfil" });
//Por hacer post-logout

const usersListController = async (req, res) => {
  try {
    let users = await user.getUsers();
    if (users) {
      res.render("users", {
        page_title: "users",
        usersAmount: users.length,
        users,
      });
    } else {
      res.render("users", { page_title: "users", usersAmount: users.length });
    }
  } catch (error) {
    res.status(400).json({ msj: `ERROR ${error}` });
  }
};

const grantsListController = async (req, res) => {
  try {
    const grants = await grant.find({});
    if (grants) {
      res.render("grants", {
        page_title: "subvenciones",
        grantsAmount: grants.length,
        grants,
      });
    } else {
      res.render("grants", {
        page_title: "subvenciones",
        grantsAmount: grants.length,
      });
    }
  } catch (error) {
    res.status(400).json({ msj: `ERROR ${error}` });
  }
};

module.exports = {
  homePageController,
  favoritesPageController,
  profilePageController,
  usersListController,
  grantsListController,
};
