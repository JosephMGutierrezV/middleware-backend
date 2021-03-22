const { Schema, model } = require("mongoose");

const medicoSchema = Schema({
  rol: {
    type: String,
    default: "MEDIC_ROLE",
  },
  mail: {
    type: String,
    required: [true, "El Correo es requerido."],
  },
  password: {
    type: String,
    required: [true, "La contraseña es requerida."],
  },
  nombre_medico: {
    type: String,
    required: [true, "El nombre es requerido."],
  },
  holtres_id: {
    type: [String],
  },
  inSession: {
    type: Boolean,
  },
});

medicoSchema.methods.toJSON = function () {
  const { __v, password, _id, ...userRest } = this.toObject();
  userRest.uid = _id;
  return userRest;
};

module.exports = model("MedicoUser", medicoSchema);
