const express = require("express");
const app = express();
const grantApiRoutes = require("./routes/grantsApiRoutes");
const favoriteRouter = require("./routes/favoritesRoutes.js");
const userApiRoutes = require("./routes/userApiRoutes");
const PORT = 3000;

const helmet = require("helmet");

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'))

app.use(express.json());
app.use(helmet());

app.use("/api/ads", grantApiRoutes);
app.use("/api/favorites", favoriteRouter);
app.use("/api/user", userApiRoutes);

const scrapinData = [
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
    "title": "SUBVENCIÓN. AYUDA PARA LA FORMACIÓN DE CUALIFICACIÓN...",
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
    "title": "SUBVENCIÓN. AYUDA PARA LA FORMACIÓN DE CUALIFICACIÓN...",
    "link": "https://www.atrapalo.com/viajes/caribe_md159.html"
  }
]

app.get("/", (req, res) => res.render('home', { "page_title": "home", scrapinData }));
app.get("/favorites", (req, res) => res.render('favorites', { "page_title": "favoritos", scrapinData }));
app.get("/profile", (req, res) => res.render('profile', {"page_title": "perfil"}));

app.get("/users", (req, res) => {
  res.status(200).send("Aquí irán los usuarios registrados");
});

app.get("/signup", (req, res) => {
  res.status(200).send("Aquí irá el registro");
});

app.get("/login", (req, res) => {
  res.status(200).send("Aquí irá la vista del usuario registrado");

});

app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});