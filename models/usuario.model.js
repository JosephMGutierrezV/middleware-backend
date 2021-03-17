const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
  name: {
    type: String,
    required: [true, "El nombre es requerido."],
  },
  mail: {
    type: String,
    required: [true, "El correo es requerido."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es requerida."],
  },
  rol: {
    type: String,
    required: [true, "El rol es requerido."],
    // emun: ["ADMIN_ROLE", "MEDIC_ROLE", "HOLTER_ROLE"],
  },
  height: {
    type: Number,
  },
  Weight: {
    type: Number,
  },
  age: {
    type: Number,
  },
  timeWithHolter: {
    type: Number,
  },
  estadoDb: {
    type: Boolean,
    default: true,
  },
});

UsuarioSchema.methods.toJSON = function () {
  const { __v, password, _id, ...userRest } = this.toObject();
  userRest.uid = _id;
  return userRest;
};

module.exports = model("User", UsuarioSchema);
