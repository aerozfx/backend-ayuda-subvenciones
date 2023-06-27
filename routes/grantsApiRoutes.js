const express = require("express");
const {
  getAllGrants,
  createOneGrant,
  updateOneGrant,
  deleteOneGrant,
} = require("../controllers/grantsApiControllers");
const grantRouter = express.Router();

grantRouter.post("/ads", createOneGrant);
grantRouter.patch("/ads/:id?", updateOneGrant);
grantRouter.get("/ads/:id?", getAllGrants);

module.exports = grantRouter;

/* 
- "/api/ads" Crear nueva subvención POST
- "/api/ads" Editar datos de la subvención PUT
- "/api/ads" Borrar subvención DELETE
- "/api/ads/search" Resultados de la búsqueda GET
- "/api/ads" todas las subenciones GET
*/
