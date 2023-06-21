const express = require("express");
const app = express();
const grantApiRoutes = require("./routes/grantsApiRoutes");
const favoriteRouter = require("./routes/favoritesRoutes.js");
const userApiRoutes = require("./routes/userApiRoutes");
const { renderHomePage, renderFavoritesPage, renderProfilePage } = require("./controllers/viewsController");
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

app.get("/users", (req, res) => {
  res.status(200).send("Aquí irán los usuarios registrados");
});

app.get("/signup", (req, res) => {
  res.status(200).send("Aquí irá el registro");
});

app.get("/login", (req, res) => {
  res.status(200).send("Aquí irá la vista del usuario registrado");

});

app.get("/", renderHomePage);
app.get("/favorites", renderFavoritesPage);
app.get("/profile", renderProfilePage);

app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});