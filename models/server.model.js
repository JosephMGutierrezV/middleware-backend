const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config.database.users");
const { socketController } = require("../sockets/sockect.controller");
class serverClass {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.server = require("http").createServer(this.app);
    this.io = require("socket.io")(this.server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["socket-headerc"],
        credentials: true,
      },
    });
    this.userRoutsPath = "/api/users";
    this.authPath = "/api/auth";

    // Conectar base de datos
    this.conectDb();

    //Middleware
    this.middlewares();

    // Rutas de la app
    this.routes();

    // Sockets
    this.socket();
  }

  socket() {
    console.log("Escuchando sockets...");
    this.io.on("connection", socketController, this.io);
  }

  async conectDb() {
    await dbConnection();
  }

  routes() {
    this.app.use(this.authPath, require("../routes/auth.routes"));
    this.app.use(this.userRoutsPath, require("../routes/user.routes"));
  }
  middlewares() {
    // CORS
    this.app.use(cors({ origin: true, credentials: true }));

    // Lectura y parseo
    this.app.use(express.json());

    // web app
    this.app.use(express.static("public"));
  }
  starServer() {
    this.server.listen(this.port, () => {
      console.log(`Corriendo en el puerto: ${this.port}`);
    });
  }
}

module.exports = serverClass;
