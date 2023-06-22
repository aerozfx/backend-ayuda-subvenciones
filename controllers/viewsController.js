const scrapingData = [
  { 
    "id": "703613", 
    "admin": "ESTADO",
    "departament": "MINISTERIO DE EDUCACIÓ Y FORMACIÓN PROFESIONAL",
    "org": "SECRETARÍA GENERAL DE DORMACIÓN PROFESIONAL",
    "date": "16/06/2023",
    "title": "SUBVENCIÓN. AYUDA PARA LA FORMACIÓN DE CUALIFICACIÓN...",
    "link": "https://www.atrapalo.com/viajes/caribe_md159.html"
  },
  { 
    "id": "703614", 
    "admin": "ESTADO",
    "dep": "MINISTERIO DE EDUCACIÓ Y FORMACIÓN PROFESIONAL",
    "org": "SECRETARÍA GENERAL DE DORMACIÓN PROFESIONAL",
    "date": "16/06/2023",
    "title": "AYUDA...",
    "link": "https://www.myswitzerland.com/es-es/"
  },
  { 
    "id": "703615", 
    "admin": "ESTADO",
    "dep": "MINISTERIO DE EDUCACIÓ Y FORMACIÓN PROFESIONAL",
    "org": "SECRETARÍA GENERAL DE DORMACIÓN PROFESIONAL",
    "date": "16/06/2023",
    "title": "SUBVENCIÓN. AYUDA PARA LA FORMACIÓN DE CUALIFICACIÓN...",
    "link": "https://www.sundaririce.com/wp-content/uploads/2017/10/Maki-roll-invertido-relleno-de-aguacate-langostino-en-tempura-y-pepino_K2F6221.jpg"
  },
  { 
    "id": "703616", 
    "admin": "ESTADO",
    "dep": "LO QUE PUEDA",
    "org": "SECRETARÍA GENERAL DE DORMACIÓN PROFESIONAL",
    "date": "16/06/2023",
    "title": "BECA PARA LA FORMACIÓN DE CUALIFICACIÓN ...",
    "link": "https://www.atrapalo.com/viajes/caribe_md159.html"
  }
];

let authorised = true;

const homePageController = async(req, res) => {
  try {

    if (authorised) {
      const searchParam = req.query.search;
      
      if (searchParam) {
        const searchTerms = searchParam.toUpperCase().split(' ');

        let grants = scrapingData.filter(data => {
          const match = searchTerms.some(searchTerm => data.title.toUpperCase().indexOf(searchTerm) !== -1);
          return match
        }) //await grant.find({title:req.query.search},'-_id -__v') CON REGEX grant.find({ dep: RegExp(req.query.search, 'i')
        res.render('home', { "page_title": "home", scrapingData: grants })
      }
      else {
        res.render('home', { "page_title": "home" });
      }
    }
    else {
      res.render('homeWeb', { "page_title": "F.A.M Pyme" });
    }
  }
  catch(error) {
    res.status(400).json({ msj: `ERROR ${error}`});
  }
};

const favoritesPageController = (req, res) => res.render('favorites', { "page_title": "favoritos", scrapingData });

const profilePageController = (req, res) => res.render('profile', {"page_title": "perfil"});

//Por hacer post-logout


module.exports = {
  homePageController,
  favoritesPageController,
  profilePageController
}