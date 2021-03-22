const { Schema, model } = require("mongoose");

const UsuarioSocketSchema = Schema({
  uid: {
    type: String,
    required: [true, "Es requerido el id."],
    unique: true,
  },
  token: {
    type: String,
    required: [true, "Es requerido el Token."],
    unique: true,
  },
});

module.exports = model("Socket", UsuarioSocketSchema);
