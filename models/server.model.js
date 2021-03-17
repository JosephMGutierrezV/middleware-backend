const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config.database");

class serverClass {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.userRoutsPath = "/api/users";

    // Conectar base de datos
    this.conectDb();

    //Middleware
    this.middlewares();

    // Rutas de la app
    this.routes();
  }

  async conectDb() {
    await dbConnection();
  }

  routes() {
    this.app.use(this.userRoutsPath, require("../routes/user.routes"));
  }
  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo
    this.app.use(express.json());

    // web app
    this.app.use(express.static("public"));
  }
  starServer() {
    this.app.listen(this.port, () => {
      console.log(`Corriendo en el puerto: ${this.port}`);
    });
  }
}

module.exports = serverClass;
