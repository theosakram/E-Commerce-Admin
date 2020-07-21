const { verifyToken } = require("../helper/jwt");
const { User } = require("../models");

async function authentic(req, res, next) {
  let { access_token } = req.headers;

  try {
    let decoded = verifyToken(access_token);
    const target = await User.findOne({
      where: {
        email: decoded.email,
      },
    });
    if (!target) throw { status: 401, msg: "User not found" };
    else {
      req.data = decoded;
      next();
    }
  } catch (err) {
    next(err);
  }
}

module.exports = authentic;
