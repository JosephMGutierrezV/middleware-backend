const { Schema, model } = require("mongoose");
const ecgSchema = Schema({
  uid_dispositivo: {
    type: String,
  },
  id_medico_a_cargo: {
    type: String,
  },
  nombre_usuario: {
    type: String,
  },
  fecha_emision: {
    type: Date,
  },
  data_derrivadas: [
    {
      nombre: {
        type: String,
      },
      array_voltaje: {
        type: [Number],
      },
      valor_p: {
        type: Number,
      },
      valor_q: {
        type: Number,
      },
      valor_r: {
        type: Number,
      },
      valor_s: {
        type: Number,
      },
      valor_qrs: {
        type: Number,
      },
      inrregular: {
        type: Boolean,
      },
    },
  ],
});

module.exports = model("Ecg", ecgSchema);
