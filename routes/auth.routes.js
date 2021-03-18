const { Router } = require("express");
const { check } = require("express-validator");
const { login, validateInSession } = require("../controllers/auth.controller");
const { validateCampos, validateJWT } = require("../middlewares");
const router = Router();

router.post(
  "/login",
  [
    check("mail", "El correo es requerido.").not().isEmpty(),
    check("mail", "Tiene que ingresar un correo valido.").isEmail(),
    check("password", "La contraseña es requerida.").not().isEmpty(),
    validateCampos,
  ],
  login
);

router.get("/valid-user", validateJWT, validateInSession);

module.exports = router;
