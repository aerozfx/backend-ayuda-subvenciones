require("dotenv").config();
const express = require("express");
require("./utils/db-mongo"); // Conexión a BBDD MongoDB
const app = express();
const helmet = require("helmet");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const scrapper = require("./utils/scrapper");
const Grant = require("./models/grants");
const webRouter = require("./routes/webRouter");
const apiRouter = require("./routes/apiRouter");
const handler404 = require("./middlewares/404handler");

const PORT = 3000;

const getDocumentsAmount = async () => {
  let result = await Grant.countDocuments({ id: { $gt: 0 } });
  return result;
};
getDocumentsAmount().then((data) => {
  if (!data === 0) {
    scrapper();
  }
});

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cookieParser());
app.use(session({ secret: "SECRET" }));
app.use(passport.initialize());
app.use(passport.session());

// Punto de entrada a la aplicación
app.use("/", webRouter);
// Endpoints con /api/...
app.use("/api", apiRouter);
app.use(handler404);

app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});
