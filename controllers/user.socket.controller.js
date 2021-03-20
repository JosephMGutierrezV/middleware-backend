const UsuarioSocket = require("../models/socket.user");

const addUsuario = async (id, token) => {
  const usuarioSocket = new UsuarioSocket({ id, token });

  // Guardar Db
  await usuarioSocket.save();

  console.log("Se guardo el usuario...");
};

const deleteUser = async (id) => {
  const usuarioSocket = await UsuarioSocket.findOneAndRemove(
    { id: id },
    (err, docs) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Se elimino el usuario: ${docs}`);
      }
    }
  );
};

const updateUser = async (id, token) => {
  console.log(`Valor a actualizar: ${id}`);
  const usuarioSocket = await UsuarioSocket.findOneAndUpdate({ token }, { id });
  if (usuarioSocket) {
    if (id === usuarioSocket.id) {
      console.log("No se cambio el id en base.");
    } else {
      console.log("Se actualizo el socket.");
    }
  }
};

const getUserSocket = async (token) => {
  const usuarioSocket = await UsuarioSocket.findOne({ token });
  if (usuarioSocket) {
    return usuarioSocket;
  }
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
