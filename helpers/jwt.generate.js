const jwt = require("jsonwebtoken");

const generateJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payLoad = {
      uid,
    };
    jwt.sign(
      payLoad,
      process.env.SECRET_PRIVATE_KEY,
      {
        expiresIn: "1h",
      },
      (err, token) => {
        if (err) {
          console.error(err);
          reject("No se pudo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generateJWT,
};
