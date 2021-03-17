require("dotenv").config();

const serverClass = require("./models/server.model");

const server = new serverClass();

server.starServer();
