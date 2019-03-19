const localtunnel = require('localtunnel');
const config      = require('./services/globalConfig');
localtunnel(config.port, {subdomain: 'dfca9b734a9c50e93380739b3354b0f0-unapalabra'}, (err, tunnel)=>{
  console.log(`Tunel establecido corriedno en: ${tunnel.url}`);
});