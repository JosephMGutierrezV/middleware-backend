const { Schema, model } = require("mongoose");

const holterSchema = Schema({
  rol: {
    type: String,
    default: "HOLTER_ROLE",
  },
  nombre_holter: {
    type: String,
    required: [true, "El nombre es requerido."],
    unique: true,
  },
  id_medico_a_cargo: {
    type: String,
    required: [true, "Medico a cargo es requerido"],
  },
  fecha_creacion: {
    type: Date,
    required: [true, "La fecha es requerida."],
  },
  inSession: {
    type: Boolean,
  },
});

holterSchema.methods.toJSON = function () {
  const { __v, password, _id, ...userRest } = this.toObject();
  userRest.uid = _id;
  return userRest;
};

module.exports = model("HolterUser", holterSchema);
