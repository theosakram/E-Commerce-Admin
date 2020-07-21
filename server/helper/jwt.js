const jwt = require("jsonwebtoken");
const secretkey = process.env.SECRETKEY;

function createToken(value) {
  return jwt.sign(value, secretkey);
}

function verifyToken(token) {
  return jwt.verify(token, secretkey);
}

module.exports = { createToken, verifyToken };
