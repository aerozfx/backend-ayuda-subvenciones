const mongoose = require('mongoose');
require('../utils/db-mongo') // Conexión a BBDD MongoDB

const objectSchema = {
    id: {
        type: Number,
        required: true,
        unique: true
    },
    mrr: {
        type: String,
        required: true,
        unique: true
    },
    admin: {
        type: String,
        required: true
    },
    dep: {
        type: String,
        required: true
    },
    org: {
        type: String,
    },
    date: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    title_co: {
        type: String,
    },
    asignedTo: {
        type: String,
    },
    link: {
        type: String,
        required: true
    },
};
// Crear el esquema
const grantSchema = mongoose.Schema(objectSchema);


// Crear el modelo --> Colección
const grant = mongoose.model('Product', grantSchema);

module.exports = grant;