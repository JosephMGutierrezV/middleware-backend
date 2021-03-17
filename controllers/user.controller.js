const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario.model");

const userGet = (req, res) => {
  const { q, nombre, api_key } = req.query;
  res.json({
    msg: "Peticion get",
    q,
    nombre,
    api_key,
  });
};

const userPut = (req, res) => {
  const id = req.params.id;
  res.json({
    msg: "Peticion put",
    id,
  });
};

const userDelet = (req, res) => {
  res.json({
    msg: "Peticion delete",
  });
};

const userPost = async (req, res) => {
  const { name, mail, password, rol } = req.body;
  const usuario = new Usuario({ name, mail, password, rol });

  // Validar que sea correo
  const existEmail = await Usuario.findOne({ mail });
  if (existEmail) {
    return res.status(400).json({
      msg: "Ese correo ya esta registrado.",
    });
  }

  // Encriptar contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  // Guardar Db
  await usuario.save();

  res.json({
    msg: "Peticion post",
    usuario,
  });
};

const userPatch = (req, res) => {
  res.json({
    msg: "patch post",
  });
};

module.exports = {
  userGet,
  userPut,
  userDelet,
  userPost,
  userPatch,
};
