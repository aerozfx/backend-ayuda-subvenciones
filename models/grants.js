const mongoose = require('mongoose');


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

    },
    dep: {
        type: String,

    },
    org: {
        type: String,

    },
    date: {
        type: String,

    },
    title: {
        type: String,

    },
    title_co: {
        type: String,
    },
    asignedTo: {
        type: String,
    },
    link: {
        type: String,

    },
};
// Crear el esquema
const grantSchema = new mongoose.Schema(objectSchema);

// Crear el modelo --> Colección
const Grant = mongoose.model('grant', grantSchema);

module.exports = Grant;