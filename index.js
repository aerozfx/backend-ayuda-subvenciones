const express = require("express");
const app = express();
const grantApiRoutes = require("./routes/grantsApiRoutes");
const favoriteRouter = require("./routes/favoritesRoutes.js");
const userApiRoutes = require("./routes/userApiRoutes");
const PORT = 3000;

const helmet = require("helmet");

app.use(express.json());
app.use(helmet());

app.use("/api/ads", grantApiRoutes);
app.use("/api/favorites", favoriteRouter);
app.use("/api/user", userApiRoutes);


app.get("/", (req, res) => {
  res.status(200).render("home.pug");
});

app.get("/profile", (req, res) => {
  res.status(200).send("Aquí irá el perfil");
});

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
