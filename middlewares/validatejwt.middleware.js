const jwt = require("jsonwebtoken");

const Usuario = require("../models/usuario.model");

const validateJWT = async (req, res, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      msg: "Token invalido.",
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRET_PRIVATE_KEY);

    // Leer usuario
    const usuario = await Usuario.findById(uid);

    // Verificar si el usuario
    if (!usuario) {
      return res.status(401).json({
        msg: "Token invalido.",
      });
    }

    // Verificar estado de usuario
    if (!usuario.estadoDb) {
      return res.status(401).json({
        msg: "Token invalido.",
      });
    }

    req.usuario = usuario;
    return next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      msg: "Token invalido.",
    });
  }
};

module.exports = {
  validateJWT,
};
