const express = require("express");
// let pug = require("pug")
const app = express();
const PORT = 3000;

const helmet = require("helmet");

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'))

app.use(helmet());

app.get("/", (req, res) => res.render('home', {"page_title": "Home"}));
app.get("/favorites", (req, res) => res.render('favorites', {"page_title": "favoritos"}));
app.get("/profile", (req, res) => res.render('profile', {"page_title": "perfil"}));

app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});