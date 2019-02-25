const bcrypt = require('bcrypt-nodejs');
let   salt   = bcrypt.genSaltSync(10);
let   hash   = bcrypt.hashSync('dfca9b734a9c50e93380739b3354b0f0', salt);

module.exports = {
  port        : process.env.PORT || 3000,
  db          : process.env.MONGODB_URI || 'mongodb://localhost:27017/edlugora',
  SECRET_TOKEN: hash
};
