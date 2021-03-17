const isAdminRole = (req, res, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      msg: "Se quiere verificar el rol sin validar el JWT.",
    });
  }

  const { rol, name } = req.usuario;

  if (rol !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: "No es un administrador",
    });
  }

  return next();
};

const includesRol = (...roles) => {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(500).json({
        msg: "Se quiere verificar el rol sin validar el JWT.",
      });
    }
    if (!roles.includes(req.usuario.rol)) {
      return res.status(401).json({
        msg: `${req.usuario.rol}, no es un usaurio valido para esta operacion.`,
      });
    }
    return next();
  };
};

module.exports = {
  isAdminRole,
  includesRol,
};
