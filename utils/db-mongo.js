const mongoose = require("mongoose");
require('dotenv').config();
//mongoose.set('strictQuery', false);
//const DATABASE_URL = "mongodb://localhost:27017/fakeshop";
// mongoose.connect("mongodb://localhost:27017/local", { useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect(`mongodb+srv://Alvaro3c:${process.env.ATLAS_PASSWORD}@cluster1.7mwh1sr.mongodb.net/`);

const db = mongoose.connection;

// Eventos
db.on("error", error => console.log(error));
db.once("open", () => console.log("connection to MongoDB established"));

module.exports = mongoose; 