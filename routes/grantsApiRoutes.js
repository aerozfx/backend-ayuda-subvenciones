const express = require('express');
const { getAllGrants, getOneGrant, createOneGrant, updateOneGrant, deleteOneGrant } = require('../controllers/grantsApiControllers');
const grantRouter = express.Router();

grantRouter.post('/ads', createOneGrant);
grantRouter.put("/ads/:title?", updateOneGrant); //ruta variable para decirle cual cambiar
grantRouter.delete("/ads/:title", deleteOneGrant);
grantRouter.get("/ads/search/:title?", getOneGrant);
grantRouter.get("/ads", getAllGrants);


module.exports = grantRouter;

/* 
- "/api/ads" Crear nueva subvención POST
- "/api/ads" Editar datos de la subvención PUT
- "/api/ads" Borrar subvención DELETE
- "/api/ads/search" Resultados de la búsqueda GET
- "/api/ads" todas las subenciones GET
*/