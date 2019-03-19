const mongoose = require('mongoose');
const app      = require('./appServer');
const config   = require('./services/globalConfig');
const HandlerSms   = require('./services/atSMS.js');

mongoose.connect(config.db,{useNewUrlParser: true}, (err) => {
  if (err) {
    return console.log(`Error al conectar a la base de datos: ${err}`);
  }
  console.log('Conexión a la base de datos establecida...');

  app.listen(config.port, () => {
    console.log(`API corriendo en http://localhost:${config.port}`);
    HandlerSms.setData();
  });
});
