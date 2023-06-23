const grant = require('../models/grants')

const authorised = true;

const homePageController = async(req, res) => {
  try {
    if (authorised) {
      const searchParam = req.query.search;
      
      if (searchParam) {
        const grants = await grant.find({}) 
        const searchTerms = searchParam.toUpperCase().split(' ');
        let matchingGrants = grants.filter(data => {
          const match = searchTerms.some(searchTerm => data.title.toUpperCase().indexOf(searchTerm) !== -1);
          return match
        }) 
        res.render('home', { 
          "page_title": "home",
          authorised,
          scrapingData: matchingGrants 
        })
      }
      else {
        res.render('home', { "page_title": "home", authorised });
      }
    }
    else {
      res.render('homeWeb', { "page_title": "F.A.M Pyme", authorised });
    }
  }
  catch(error) {
    res.status(400).json({ msj: `ERROR ${error}`});
  }
};

// const favoritesPageController = (req, res) => res.render('favorites', { "page_title": "favoritos", scrapingData });

const profilePageController = (req, res) => res.render('profile', {"page_title": "perfil"});

//Por hacer post-logout

const users = [
  {
    "user_id": 1,
    "name": "Mariangelica",
    "surname": "Rodriguez",
    "email": "marian@gmail.com",
    "password": "hcipqy1r123",
    "role": "admin"
  },
  {
    "user_id": 2,
    "name": "Geronimo",
    "surname": "Lopez",
    "email": "gero@gmail.com",
    "password": "hcikxpow123",
    "role": "user"
  },
  {
    "user_id": 3,
    "name": "Mariangelica",
    "surname": "Rodriguez",
    "email": "marian@gmail.com",
    "password": "hcipqy1r123",
    "role": "user"
  },
  {
    "user_id": 4,
    "name": "Miguel",
    "surname": "Varon",
    "email": "migue@gmail.com",
    "password": "kowejy1r123",
    "role": "user"
  },
]
const usersListController = (req, res) => {
  try {
    if (users) {
      res.render('users', { "page_title": "users", users})
    }
  }
  catch(error) {
    res.status(400).json({ msj: `ERROR ${error}`});
  }
};

module.exports = {
  homePageController,
  // favoritesPageController,
  profilePageController,
  usersListController
}