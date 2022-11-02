const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearFactura,
  getFacturas,
} = require("../controllers/factura.controller");
const { userByIdExists } = require("../helpers/db-validators");

const { validateFields, validateJWT } = require("../middlewares");

const router = Router();

// Obtener todas las categorías - público
router.get("/", getFacturas);

// Crear categoría - privado - cualquier persona con un token válido
router.post(
  "/",
  [
    check("user", "El usuario es requerido").not().isEmpty(),
    check("productos", "Debe ser un array de ids de productos").isArray(),
    check("productos", "Debe haber minimo un producto").isLength({ min: 1 }),
    validateFields,
  ],
  crearFactura
);

module.exports = router;
