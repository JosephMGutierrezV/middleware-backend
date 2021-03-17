const ValidaCampos = require("../middlewares/campos.middleware");
const ValidaJWT = require("../middlewares/validatejwt.middleware");
const ValidaRoles = require("../middlewares/validaterol.middleware");

module.exports = {
  ...ValidaCampos,
  ...ValidaJWT,
  ...ValidaRoles,
};
