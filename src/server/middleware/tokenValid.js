const jwt = require('jsonwebtoken');
const config = require('../services/globalConfig');
function tokenValid (req, res, next) {
  console.log(req.user);
  // let seccionUsers = req.app.get('seccionUsers');
  // if (req.user._id in seccionUsers) {
  //   let verfTk = jwt.verify(seccionUsers[req.user._id], config.SECRET_TOKEN);
  //   console.log(verfTk);
  // }
  next();
}

module.exports = {
  tokenValid
};