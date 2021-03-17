const { Router } = require("express");
const { check } = require("express-validator");
const { validateCampos } = require("../middlewares/campos.middleware");
const { rolValidate } = require("../helpers/db.validators");
const {
  userGet,
  userDelet,
  userPut,
  userPost,
  userPatch,
} = require("../controllers/user.controller");

const router = Router();

router.get("/", userGet);
router.put("/:id", userPut);
router.delete("/", userDelet);
router.post(
  "/",
  [
    check("mail", "El correo no es valido.").isEmail(),
    check("name", "El nombre es requerido").not().isEmpty(),
    check("password", "La contraseña es requerida y de mas de 6 letras")
      .isLength({ min: 6 })
      .not()
      .isEmpty(),
    check("rol").custom(rolValidate),
    validateCampos,
  ],
  userPost
);
router.patch("/", userPatch);

module.exports = router;
