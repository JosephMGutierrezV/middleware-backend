const {
  addUsuario,
  getUserSocket,
  updateUser,
  deleteUser,
} = require("../controllers/user.socket.controller");

const Ecg = require("../models/ecg.model");

const socketController = (cliente, io) => {
  console.log(`cliente conectado: ${cliente.id}`);

  configurarUsuario(cliente);

  reconectarUsuario(cliente);

  configureAndStarEcgRealTime(cliente, io);

  desconectar(cliente);
};

const emitirEventos = (io, evento, payload, callback) => {
  io.emit(evento, payload, callback);
};

const desconectar = (cliente) => {
  cliente.on("disconnect", (payload) => {
    console.log(`cliente desconectado: ${cliente.id}`);
  });
};

const reconectarUsuario = (cliente) => {
  cliente.on("check-status", (payload) => {
    const token = payload.token;
    const id = cliente.id;
    console.log(`Cliente a renovar: ${id}`);
    const acccion = getUserSocket(token);
    if (acccion) {
      updateUser(id, token);
    }
  });
};

const configurarUsuario = async (cliente) => {
  cliente.on("configuar-usuario", async (payload) => {
    const token = payload.token;
    const id = cliente.id;
    console.log(`Usuario a configurar: ${id}`);
    const acccion = getUserSocket(token);
    if (!acccion) {
      await addUsuario(id, token);
    } else {
      await deleteUser(id);
      if (token != "ELIMINAR") {
        await addUsuario(id, token);
      }
    }
  });
};

const logoutSocket = () => {
  cliente.on("logout", (payload) => {
    const id = cliente.id;
    deleteUser(id);
  });
};

const configureAndStarEcgRealTime = async (cliente, io) => {
  console.group();
  console.log("Entro");
  await Ecg.watch(
    [
      { $match: { operationType: { $in: ["insert", "update", "replace"] } } },
      { $project: { _id: 1, fullDocument: 1, ns: 1, documentKey: 1 } },
    ],
    { fullDocument: "updateLookup" }
  ).on("change", (change) => {
    console.log(`Algo cambio se enviara a: ${cliente.id}`, change);
    /*TODO:
    1. Validar con el token del socket el token y uid del usuario
    2. Validar que sea rol medico y sea el medico encargado para emitirle la informacion
    */

    io.to(cliente.id).emit("changes", change.fullDocument);
  });
  console.log("Termino");
  console.groupEnd();
};

module.exports = {
  socketController,
};
