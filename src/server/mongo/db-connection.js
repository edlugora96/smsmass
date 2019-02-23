const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/edlugora', {useMongoClient: true})

module.exports = mongoose;