const express = require("express");
const app = express();
const PORT = 3000;

const helmet = require("helmet");

app.use(helmet());

app.get("/", (req, res) => {
  res.status(200).send("Aquí irá el login");
});

app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});
