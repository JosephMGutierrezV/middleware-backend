const HolterUser = require("../models/holter.model");
const MedicoUser = require("../models/doctor.model");
const { generateJWT } = require("../helpers/jwt.generate");

const registerUserDB = async (req, res) => {
  const { nombre_holter, id_medico_a_cargo, fecha_creacion } = req.body;
  try {
    const isExistsUser = await HolterUser.findOne({ nombre_holter });
    if (isExistsUser) {
      return res.status(400).json({
        msg: "El usuario a registrar ya existe",
      });
    }

    const isExistMedic = await MedicoUser.findOne({ id: id_medico_a_cargo });
    if (!isExistMedic) {
      return res.status(400).json({
        msg: "No exoste el medico a vincular",
      });
    }

    isExistMedic.holtres_id.push(isExistsUser.id);

    const { id } = isExistMedic;

    const updateMedic = await MedicoUser.findOneAndUpdate({ id }, isExistMedic);

    const usuario = new HolterUser({
      nombre_holter,
      id_medico_a_cargo,
      fecha_creacion,
    });

    await usuario.save();

    res.json({
      succes: "true",
    });
  } catch (error) {
    console.error(`[Error: ${error}]`);
    return res.status(500).json({
      succes: "false",
      msg: `Ha ocurrido un error intente mas tarde.`,
    });
  }
};

const loginUserDB = async (req, res) => {
  const { nombre_holter } = req.body;
  try {
    const usuario = await HolterUser.findOne({ nombre_holter });
    if (!usuario) {
      return res.status(400).json({
        msg: "El nombre ingresado no se encuentra en la base de datos.",
      });
    }

    // Generar JWT
    const token = await generateJWT(usuario.id);

    // Cambiar el estado inSession
    usuario.inSession = true;

    const updateUserInSession = await HolterUser.findOneAndUpdate(
      { nombre_holter },
      usuario
    );
    res.json({
      succes: "true",
      token,
    });
  } catch (error) {
    console.error(`[Error: ${error}]`);
    return res.status(500).json({
      succes: "false",
      msg: `Ha ocurrido un error intente mas tarde.`,
    });
  }
};

const logoutUserDB = async (req, res) => {
  const { usuario } = req;
  const { nombre_holter } = usuario;
  try {
    const isUserExist = await HolterUser.findOne({ nombre_holter });
    if (!isUserExist) {
      return res.status(400).json({
        msg: "El nombre ingresado no se encuentra en la base de datos.",
      });
    }

    // Cambiar el estado inSession
    isUserExist.inSession = false;

    const updateUserInSession = await HolterUser.findOneAndUpdate(
      { nombre_holter },
      isUserExist
    );
    res.json({
      succes: "true",
    });
  } catch (error) {
    console.error(`[Error: ${error}]`);
    return res.status(500).json({
      succes: "false",
      msg: `Ha ocurrido un error intente mas tarde.`,
    });
  }
};

const listarMedicosBase = async (req, res) => {
  const { limite = 5, desde = 0 } = req.query;
  try {
    const [usuarios, total] = await Promise.all([
      MedicoUser.find({ rol: "MEDIC_ROLE" })
        .skip(Number(desde))
        .limit(Number(limite)),
      MedicoUser.countDocuments({ rol: "MEDIC_ROLE" }),
    ]);
    res.json({
      usuarios,
      total,
    });
  } catch (error) {
    console.error(`[Error: ${error}]`);
    return res.status(500).json({
      succes: "false",
      msg: `Ha ocurrido un error intente mas tarde.`,
    });
  }
};
module.exports = {
  registerUserDB,
  loginUserDB,
  logoutUserDB,
  listarMedicosBase,
};
