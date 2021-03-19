const { Router } = require("express");
const { check } = require("express-validator");
const {
  login,
  validateInSession,
  logoutUser,
  registerUser,
} = require("../controllers/auth.controller");
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

router.post(
  "/register",
  [
    check("mail", "El correo es requerido.").not().isEmpty(),
    check("mail", "Tiene que ingresar un correo valido.").isEmail(),
    check("password", "La contraseña es requerida.").not().isEmpty(),
    validateCampos,
  ],
  registerUser
);

router.get("/logut", validateJWT, logoutUser);

router.get("/valid-user", validateJWT, validateInSession);

module.exports = router;
