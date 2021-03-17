const { validationResult } = require("express-validator");

const validateCampos = (req, res, next) => {
  const erros = validationResult(req);
  if (!erros.isEmpty()) {
    return res.status(400).json({
      msg: erros,
    });
  }
  return next();
};

module.exports = {
  validateCampos,
};