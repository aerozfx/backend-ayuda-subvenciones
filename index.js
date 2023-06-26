require("dotenv").config();
const express = require("express");
require("./utils/db-mongo"); // Conexión a BBDD MongoDB
const app = express();
const helmet = require("helmet");
const scrapper = require("./utils/scrapper");
const Grant = require("./models/grants");
const webRouter = require("./routes/webRouter");
const apiRouter = require("./routes/apiRouter");
const handler404 = require("./middlewares/404handler");
const bodyParser = require('body-parser');
const Counter = require('./models/counter');

const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));


app.post('/dashboard', async (req, res) => {

  try {
    let grant = new Grant({
      id: Number(req.body.id),
      mrr: req.body.mrr,
      admin: req.body.admin,
      dep: req.body.dep,
      date: req.body.date,
      title: req.body.title,
      title_co: req.body.title_co,
      assignedTo: '', //esta misma linea estaba en el scrapper
      link: req.body.link
    });
    grant.save()
    res.status(201).redirect('/dashboard');
  } catch (error) {
    throw new error
  }
})


const getDocumentsAmount = async () => {
  let result = await Grant.countDocuments({ id: { $gt: 0 } });
  return result;
};
getDocumentsAmount().then((data) => {
  if (!data === 0) {
    scrapper();
  };
});

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
