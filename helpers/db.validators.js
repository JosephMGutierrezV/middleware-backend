const Rol = require("../models/rol.model");

const rolValidate = async (rol = "") => {
  const existRol = await Rol.findOne({ rol });
  if (!existRol) {
    throw new Error(`El rol ${rol}, no esta registrado en la BD.`);
  }
};

module.exports = {
  rolValidate,
};
