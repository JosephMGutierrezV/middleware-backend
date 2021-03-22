const {
  addUsuario,
  getUserSocket,
  updateUser,
  deleteUser,
} = require("../controllers/user.socket.controller");
const { validarSocketHolter } = require("../controllers/medico.controller");

const Ecg = require("../models/ecg.model");

const socketController = (cliente, io) => {
  console.log(`cliente conectado: ${cliente.id}`);

  configurarUsuario(cliente);

  reconectarUsuario(cliente);

  configureAndStarEcgRealTime(cliente, io);

  logoutSocket(cliente);

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
  cliente.on("check-status", async (payload) => {
    const token = payload.token;
    const id = cliente.id;
    console.log(`Renovar: ${id}`);
    const acccion = await getUserSocket(token);
    if (acccion) {
      await updateUser(id, token);
    }
  });
};

const configurarUsuario = (cliente) => {
  cliente.on("login", async (payload) => {
    const token = payload.token;
    const id = cliente.id;
    console.log(`Login: ${id}`);
    const acccion = await getUserSocket(token);
    if (!acccion) {
      await deleteUser(id);
      await addUsuario(id, token);
    }
  });
};

const logoutSocket = (cliente) => {
  cliente.on("logout", async (payload) => {
    const id = cliente.id;
    await deleteUser(id);
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
  ).on("change", async (change) => {
    // console.log(`Algo cambio se enviara a: ${cliente.id}`, change);
    /*TODO:
    1. Validar con el token del socket el token y uid del usuario
    2. Validar que sea rol medico y sea el medico encargado para emitirle la informacion
    */
    const doc = change.fullDocument;
    const { uid_dispositivo } = doc;
    const isMedicalForSignal = await validarSocketHolter(
      cliente.id,
      uid_dispositivo
    );
    if (isMedicalForSignal) {
      io.to(cliente.id).emit("changes", change.fullDocument);
    }
  });
  console.log("Termino");
  console.groupEnd();
};

module.exports = {
  socketController,
};
