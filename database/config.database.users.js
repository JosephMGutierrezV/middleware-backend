const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.CNN_MONGODB_USERS, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("[Conectado a la base de datos {info_ecg}]");
  } catch (error) {
    console.error(error);
    throw new Error("Error al iniciar la base de datos");
  }
};

module.exports = {
  dbConnection,
};
