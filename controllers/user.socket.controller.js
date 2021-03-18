class UsuarioSocketList {
  constructor() {
    this.lista = [];
  }

  agregarUsuario(usuario) {
    this.lista.push(usuario);
  }

  actualizarUsuario(id, token) {
    for (let user of this.lista) {
      if (user.id === id) {
        user.token = token;
        break;
      }
    }
  }

  obtenerUsuariosConectados() {
    return this.lista;
  }

  getUsuario(id) {
    return this.lista.find((user) => user.id === id);
  }

  deleteUsuario(id) {
    this.lista = this.lista.filter((user) => user.id === id);
  }
}

module.exports = {
  UsuarioSocketList,
};
