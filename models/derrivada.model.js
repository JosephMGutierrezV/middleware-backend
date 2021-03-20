const { Schema, model } = require("mongoose");
const derrivadaSchema = Schema({
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
});

module.exports = model("Data_derrivada", derrivadaSchema);
