const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario.model");

const userGet = async (req, res) => {
  const { limite = 5, desde = 0 } = req.query;

  const [usuarios, total] = await Promise.all([
    Usuario.find({ estadoDb: true }).skip(Number(desde)).limit(Number(limite)),
    Usuario.countDocuments({ estadoDb: true }),
  ]);

  res.json({
    usuarios,
    total,
  });
};

const userPut = async (req, res) => {
  const id = req.params.id;
  const { _id, password, ...resto } = req.body;

  // TODO validar contra DB
  if (password) {
    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json({
    usuario,
  });
};

const userDelet = async (req, res) => {
  const { id } = req.params;

  const usuariao = await Usuario.findByIdAndUpdate(id, { estadoDb: false });
  res.json({
    usuariao,
  });
};

const userPost = async (req, res) => {
  const { name, mail, password, rol } = req.body;
  const usuario = new Usuario({ name, mail, password, rol });

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
