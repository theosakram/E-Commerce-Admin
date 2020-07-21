const bcrypt = require("bcrypt");

module.exports = {
  hash: (password) => {
    const salt = bcrypt.genSaltSync(5);
    return bcrypt.hashSync(password, salt);
  },
  compare: (password, hashed) => {
    return bcrypt.compareSync(password, hashed);
  },
};
