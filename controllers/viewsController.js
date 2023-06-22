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
    "departament": "MINISTERIO DE EDUCACIÓ Y FORMACIÓN PROFESIONAL",
    "org": "SECRETARÍA GENERAL DE DORMACIÓN PROFESIONAL",
    "date": "16/06/2023",
    "title": "AYUDA...",
    "link": "https://www.myswitzerland.com/es-es/"
  },
  { 
    "id": "703615", 
    "admin": "ESTADO",
    "departament": "MINISTERIO DE EDUCACIÓ Y FORMACIÓN PROFESIONAL",
    "org": "SECRETARÍA GENERAL DE DORMACIÓN PROFESIONAL",
    "date": "16/06/2023",
    "title": "SUBVENCIÓN. AYUDA PARA LA FORMACIÓN DE CUALIFICACIÓN...",
    "link": "https://www.sundaririce.com/wp-content/uploads/2017/10/Maki-roll-invertido-relleno-de-aguacate-langostino-en-tempura-y-pepino_K2F6221.jpg"
  },
  { 
    "id": "703616", 
    "admin": "ESTADO",
    "departament": "MINISTERIO DE EDUCACIÓ Y FORMACIÓN PROFESIONAL",
    "org": "SECRETARÍA GENERAL DE DORMACIÓN PROFESIONAL",
    "date": "16/06/2023",
    "title": "BECAPARA LA FORMACIÓN DE CUALIFICACIÓN ...",
    "link": "https://www.atrapalo.com/viajes/caribe_md159.html"
  }
];

let authorised = false;

const homePageController = async(req, res) => {
  if (authorised) {
    //if (req.params.query) {
      // let grants = scrapingData.filter(data => data.title.includes(req.params.query)) //await Grands.find({id:req.params.id},'-_id -__v')
    //}
    res.render('home', { "page_title": "home", scrapingData: grants })
  }
  else {
    res.render('homeWeb', { "page_title": "F.A.M Pyme" })
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