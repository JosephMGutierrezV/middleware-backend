const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateJWT } = require("../helpers/jwt.generate");
const MedicoUser = require("../models/doctor.model");
const HolterUser = require("../models/holter.model");
const Socket = require("../models/socket.user");

const registerUserDB = async (req, res) => {
  const { mail, password, nombre_medico } = req.body;
  try {
    const isExistsUser = await MedicoUser.findOne({ mail });
    if (isExistsUser) {
      return res.status(400).json({
        msg: "El usuario a registrar ya existe",
      });
    }

    const usuario = new MedicoUser({ mail, password, nombre_medico });

    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar Db
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
  const { mail, password } = req.body;

  try {
    // Verificar si el email existe
    const usuario = await MedicoUser.findOne({ mail });
    if (!usuario) {
      return res.status(400).json({
        msg: "Algun dato es incorrecto revise la informacion ingresada.",
      });
    }

    // validar contraseña
    const validatePassword = bcryptjs.compareSync(password, usuario.password);
    if (!validatePassword) {
      return res.status(400).json({
        msg: "Algun dato es incorrecto revise la informacion ingresada.",
      });
    }

    // Generar JWT
    const token = await generateJWT(usuario.id);

    // Cambiar el estado inSession
    usuario.inSession = true;

    const usuarioInSession = await MedicoUser.findByIdAndUpdate(
      usuario.id,
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

const logutUserDB = async (req, res) => {
  const { usuario } = req;
  const { mail } = usuario;
  try {
    const isUserExist = await MedicoUser.findOne({ mail });
    if (!isUserExist) {
      return res.status(400).json({
        msg: "El nombre ingresado no se encuentra en la base de datos.",
      });
    }

    // Cambiar el estado inSession
    isUserExist.inSession = false;

    const updateUserInSession = await MedicoUser.findOneAndUpdate(
      { mail },
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

const listarEcgsVinculados = async (req, res) => {
  const { usuario } = req;
  const { id } = usuario;
  const { limite = 5, desde = 0 } = req.query;
  try {
    const isExistsUser = await MedicoUser.findOne({ id });

    const { holtres_id } = isExistsUser;
    const [usuarios, total] = await Promise.all([
      HolterUser.find({ holtres_id }).skip(Number(desde)).limit(Number(limite)),
      HolterUser.countDocuments({ holtres_id }),
    ]);
    res.json({
      usuarios,
      total,
    });
  } catch (error) {
    return res.status(500).json({
      succes: "false",
      msg: `Ha ocurrido un error intente mas tarde.`,
    });
  }
};

const listarEcgsBase = async (req, res) => {
  const { limite = 5, desde = 0 } = req.query;
  try {
    const [usuarios, total] = await Promise.all([
      HolterUser.find({ rol: "HOLTER_ROLE" })
        .skip(Number(desde))
        .limit(Number(limite)),
      MedicoUser.countDocuments({ rol: "HOLTER_ROLE" }),
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

const validarSocketHolter = async (uid, uid_dispositivo) => {
  const id = uid;
  try {
    const isExistSocket = await Socket.findOne({ uid: id });
    if (!isExistSocket) {
      return false;
    }
    const { uid } = jwt.verify(
      isExistSocket.token,
      process.env.SECRET_PRIVATE_KEY
    );

    const usuario = await MedicoUser.findById(uid);

    if (!usuario) {
      return false;
    }
  } catch (error) {
    console.error(`[Error: ${error}]`);
    return false;
  }
};

const guardLoginPage = async (req, res) => {
  const { usuario } = req;
  try {
    const isUserInSession = await MedicoUser.findById(usuario.id);
    if (!isUserInSession) {
      return res.status(400).json({
        msg: "El nombre ingresado no se encuentra en la base de datos.",
      });
    }
    if (!isUserInSession.inSession) {
      return res.status(400).json({
        msg: "El usuario ya perdio la session.",
      });
    }
    res.json({
      succes: "true",
    });
  } catch (error) {
    return res.status(500).json({
      succes: "false",
      msg: `Ha ocurrido un error intente mas tarde.`,
    });
  }
};

module.exports = {
  registerUserDB,
  loginUserDB,
  logutUserDB,
  listarEcgsBase,
  listarEcgsVinculados,
  validarSocketHolter,
  guardLoginPage,
};
