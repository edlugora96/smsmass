const mongoose = require('mongoose');
const localtunnel = require('localtunnel');
const http = require('http');
const app = require('./appServer');
const config = require('./globalConfig');

mongoose.connect(config.db, (err, res) => {
  if (err) {
    return console.log(`Error al conectar a la base de datos: ${err}`)
  }
  console.log('Conexión a la base de datos establecida...')

  app.listen(config.port, () => {
    console.log(`API corriendo en http://localhost:${config.port}`)
    /*let tunnel = localtunnel(config.port, {subdomain: 'dfca9b734a9c50e93380739b3354b0f0-unapalabra'}, (err, tunnel)=>{
      console.log(`Tunel establecido corriedno en: ${tunnel.url}`)
      app.get('/localtunnel', (req, res) => {
        let proxyRequest = http.request({
            host: 'edlugora.ml',
            port: 80,
            method: 'POST',
            path: '/url'
          });

        proxyRequest.write(tunnel.url);
        proxyRequest.end()
        res.send({url:tunnel.url})
      })
    });*/
  })
})
