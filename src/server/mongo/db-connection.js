const mongoose = require('mongoose');

const mongooseAuth = (opt) =>{
  return mongoose.createConnection('mongodb://localhost:27017/edlugora', { useNewUrlParser: true, ...opt});
};

module.exports = mongooseAuth;