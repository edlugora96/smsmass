module.exports = {
  port: process.env.PORT || 8080,
  db: process.env.MONGODB_URI || 'mongodb://localhost:27017/edlugora',
  SECRET_TOKEN: 'dfca9b734a9c50e93380739b3354b0f0'
}
