const Rol = require("../models/rol.model");
const Usuario = require("../models/usuario.model");

const rolValidate = async (rol = "") => {
  const existRol = await Rol.findOne({ rol });
  if (!existRol) {
    throw new Error(`El rol ${rol}, no esta registrado en la BD.`);
  }
};

const validateCorreo = async (mail = "") => {
  const existEmail = Usuario.findOne({ mail });
  if (existEmail) {
    return new Error(`El correo: ${mail}, ya estas registrado en la base`);
  }
};

const existUserID = async (id) => {
  const existUser = Usuario.findById({ id });
  if (!existUser) {
    return new Error(`El id: ${id}, No existe`);
  }
};

module.exports = {
  rolValidate,
  validateCorreo,
  existUserID,
};
