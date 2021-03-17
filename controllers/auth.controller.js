const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt.generate");
const Usuario = require("../models/usuario.model");

const login = async (req, res) => {
  const { mail, password } = req.body;

  try {
    // Verificar si el email existe
    const usuario = await Usuario.findOne({ mail });
    if (!usuario) {
      return res.status(400).json({
        msg: "Algun dato es incorrecto revise la informacion ingresada.",
      });
    }

    // validar usuario
    if (!usuario.estadoDb) {
      return res.status(400).json({
        msg: "Usuario Inactivo.",
      });
    }

    // validar contraseña
    const validatePassword = bcryptjs.compareSync(password, usuario.password);
    if (!validatePassword) {
      return res.status(400).json({
        msg: "Algun dato es incorrecto revise la informacion ingresada.",
      });
    }

    // Generar JWT
    const token = await generateJWT(usuario.id);

    res.json({
      token,
      usuario,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Algo salio mal al iniciar session.",
    });
  }
};

module.exports = {
  login,
};
