const {
  addUsuario,
  getUserSocket,
  updateUser,
  deleteUser,
} = require("../controllers/user.socket.controller");

const socketController = (cliente, io) => {
  console.log(`cliente conectado: ${cliente.id}`);

  configurarUsuario(cliente);

  reconectarUsuario(cliente);

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

const configurarUsuario = (cliente) => {
  cliente.on("configuar-usuario", (payload) => {
    const token = payload.token;
    const id = cliente.id;
    console.log(`Usuario a configurar: ${id}`);
    const acccion = getUserSocket(token);
    if (acccion) {
      addUsuario(id, token);
    }
  });
};

const logoutSocket = () => {
  cliente.on("logout", (payload) => {
    const id = cliente.id;
    deleteUser(id);
  });
};

module.exports = {
  socketController,
};
