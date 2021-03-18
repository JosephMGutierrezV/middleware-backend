const socketController = (cliente, io) => {
  console.log(`cliente conectado: ${cliente.id}`);

  configurarUsuario(cliente);

  desconectar(cliente);
};

const emitirEventos = (io, evento, payload, callback) => {
  io.emit(evento, payload, callback);
};

const desconectar = (cliente) => {
  cliente.on("disconnect", () => {
    console.log(`cliente desconectado: ${cliente.id}`);
  });
};

const configurarUsuario = (cliente) => {
  cliente.on("configuar-usuario", (payload) => {
    console.log(`Se configuro el usuario: ${payload.token}`);
  });
};

module.exports = {
  socketController,
};
