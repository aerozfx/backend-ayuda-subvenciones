require("dotenv").config();
const express = require("express");
require("./utils/db-mongo"); // Conexión a BBDD MongoDB
const app = express();
const helmet = require("helmet");
const scrapper = require("./utils/scrapper");
const webRouter = require("./routes/webRouter");
const apiRouter = require("./routes/apiRouter");
const handler404 = require("./middlewares/404handler");
const PORT = 3000;

// scrapper();
app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

// Punto de entrada a la aplicación
app.use("/", webRouter);
// Endpoints con /api/...
app.use("/api", apiRouter);
app.use(handler404);
app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});
