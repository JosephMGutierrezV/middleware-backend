const { Router } = require("express");
const { check } = require("express-validator");
const {
  registerUserDB,
  loginUserDB,
  logutUserDB,
  listarEcgsVinculados,
  listarEcgsBase,
  guardLoginPage,
} = require("../controllers/medico.controller");
const {
  validateCampos,
  postValidateMedicoJWT,
  getValidateMedicoJWT,
} = require("../middlewares");
const router = Router();

// Manejo de ingreso de usaurio al sistema.
router.post(
  "/auth/register",
  [
    check("mail", "El correo es requerido.").not().isEmpty(),
    check("mail", "Tiene que ingresar un correo valido.").isEmail(),
    check("password", "La contraseña es requerida.").not().isEmpty(),
    check("nombre_medico", "El nombre del medico es requerido.")
      .not()
      .isEmpty(),
    validateCampos,
  ],
  registerUserDB
);
router.post(
  "/auth/login",
  [
    check("mail", "El correo es requerido.").not().isEmpty(),
    check("mail", "Tiene que ingresar un correo valido.").isEmail(),
    check("password", "La contraseña es requerida.").not().isEmpty(),
    validateCampos,
  ],
  loginUserDB
);
router.post("/auth/logout", postValidateMedicoJWT, logutUserDB);
// FIN Manejo de ingreso de usaurio al sistema.

// rutas para obtecion y listado de Usuarios o acciones
router.get("/get-all-ecgs", getValidateMedicoJWT, listarEcgsBase);
router.get("/get-ecgs-vinculados", getValidateMedicoJWT, listarEcgsVinculados);
// FIN para obtecion y listado de Usuarios o acciones

router.get("/guard-login", getValidateMedicoJWT, guardLoginPage);

module.exports = router;
