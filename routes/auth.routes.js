const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth.controller");
const { validateCampos } = require("../middlewares/campos.middleware");

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

module.exports = router;
