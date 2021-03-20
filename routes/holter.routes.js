const { Router } = require("express");
const { check } = require("express-validator");
const {
  registerUserDB,
  loginUserDB,
  logoutUserDB,
  listarMedicosBase,
} = require("../controllers/holter.controller");

const {
  validateCampos,
  getValidateHolterJWT,
  postValidateHolterJWT,
} = require("../middlewares");

const router = Router();

// Rutas control de ingreso de usuario
router.post(
  "/auth/register",
  [
    check("nombre_holter", "El nombre es requerido.").not().isEmpty(),
    check("id_medico_a_cargo", "Es necesario el id del medico encargado")
      .not()
      .isEmpty(),
    check("fecha_creacion", "Debe tener una fecha de creacion")
      .not()
      .isEmpty(0),
    validateCampos,
  ],
  registerUserDB
);
router.post(
  "/auth/login",
  [
    check("nombre_holter", "Debe ingresar un nombre de usaurio.")
      .not()
      .isEmpty(),
    validateCampos,
  ],
  loginUserDB
);
router.post("/auth/logout", postValidateHolterJWT, logoutUserDB);
//FIN Rutas control de ingreso de usuario

// para obtecion y listado de Usuarios o acciones

router.get("/listar-medicos", listarMedicosBase);
// FIN para obtecion y listado de Usuarios o acciones

module.exports = router;
