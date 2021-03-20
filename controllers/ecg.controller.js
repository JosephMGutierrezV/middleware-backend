const Ecg = require("../models/ecg.model");

const saveEcgDb = async (req, res) => {
  const { uid_dispositivo, nombre_usuario, data_derrivadas } = req.body;

  const ecg = new Ecg({ uid_dispositivo, nombre_usuario, data_derrivadas });

  // Guardar Db
  await ecg.save();

  res.json({
    msg: "Se guardo correctamente en la base",
    ecg,
  });
};

module.exports = {
  saveEcgDb,
};
