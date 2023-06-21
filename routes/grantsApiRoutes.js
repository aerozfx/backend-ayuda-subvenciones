const express = require('express');
const { getAllGrants, getOneGrant, createOneGrant, updateOneGrant, deleteOneGrant } = require('../controllers/grantsApiControllers');
const grantRouter = express.Router();

grantRouter.get("/", getAllGrants);
grantRouter.get(":title?", getOneGrant);
grantRouter.post('/', createOneGrant);
grantRouter.put("/:title?", updateOneGrant); //ruta variable para decirle cual cambiar
grantRouter.delete("/", deleteOneGrant);


module.exports = grantRouter;

/* 
- "/api/ads" Crear nueva subvención POST
- "/api/ads" Editar datos de la subvención PUT
- "/api/ads" Borrar subvención DELETE
- "/api/ads/search" Resultados de la búsqueda GET
- "/api/ads" todas las subenciones GET
*/