const mongoose = require("mongoose");
require('dotenv').config();
mongoose.connect(`mongodb+srv://Alvaro3c:${process.env.ATLAS_PASSWORD}@cluster1.7mwh1sr.mongodb.net/`);


const db = mongoose.connection;

// Eventos
db.on("error", error => console.log(error));
db.once("open", () => console.log("connection to MongoDB Done"));

module.exports = mongoose; 

