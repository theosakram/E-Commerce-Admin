function errorHandler(err, req, res, next) {
  switch (err.name) {
    case "SequelizeValidationError":
      const errors = err.errors.map((x) => ({ msg: x.message }));
      return res.status(400).json({ errors });

    case "SequelizeUniqueConstraintError":
      return res.status(400).json({ errors: [{ msg: err.message }] });

    case "JsonWebTokenError":
      return res.status(401).json({ errors: [{ msg: "Invalid Token" }] });

    default:
      return res.status(err.status).json({ errors: [{ msg: err.msg }] });
  }
}

module.exports = errorHandler;
