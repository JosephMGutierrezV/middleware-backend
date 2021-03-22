const UsuarioSocket = require("../models/socket.user");

const addUsuario = async (uid, token) => {
  const usuarioSocket = new UsuarioSocket({ uid, token });

  // Guardar Db
  await usuarioSocket.save();

  console.log("Se guardo el usuario...");
};

const deleteUser = async (uid) => {
  const usuarioSocket = await UsuarioSocket.findOneAndRemove(
    { uid: uid },
    (err, docs) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Se elimino el usuario: ${docs}`);
      }
    }
  );
};

const updateUser = async (uid, token) => {
  console.log(`Valor a actualizar: ${uid}`);
  const usuarioSocket = await UsuarioSocket.findOneAndUpdate(
    { token },
    { uid }
  );
  if (usuarioSocket) {
    if (uid === usuarioSocket.uid) {
      console.log("No se cambio el uid en base.");
    } else {
      console.log("Se actualizo el socket.");
    }
  }
};

const getUserSocket = async (token) => {
  const usuarioSocket = await UsuarioSocket.findOne({ token });
  if (usuarioSocket) {
    return true;
  }
  return false;
};

const getAllUsers = async () => {
  const [usuarios, total] = await Promise.all([
    UsuarioSocket.find(),
    UsuarioSocket.countDocuments(),
  ]);
  return [usuarios, total];
};

module.exports = {
  addUsuario,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserSocket,
};
