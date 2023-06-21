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

app.use("/api", grantApiRoutes); //rutas de subenciones
app.use("/api", userApiRoutes); //rutas de usuarios
app.use("/", favoriteRouter); //rutas de favoritos
app.use("/user", userApiRoutes); // esto deberia de conectar con usersRoutes que aun no existe
app.use("/", userApiRoutes); // unica ruta que no su endpoint es '/' (inicio), igual se puede quedar como esta en el index.js

app.get("/", (req, res) => res.render('home', { "page_title": "Home" }));
app.get("/favorites", (req, res) => res.render('favorites', { "page_title": "favoritos" }));
app.get("/profile", (req, res) => res.render('profile', { "page_title": "perfil" }));

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