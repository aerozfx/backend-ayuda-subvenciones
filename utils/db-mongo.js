const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", false);
mongoose.connect(
  `mongodb+srv://Alvaro3c:${process.env.ATLAS_PASSWORD}@cluster1.7mwh1sr.mongodb.net/`,
  {
    // Opciones de la conexión
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

// Eventos
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connection to MongoDB Done"));

module.exports = mongoose;
