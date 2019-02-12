const express = require('express');
const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path');
var  cors  = require ( 'cors');
const smsApi = require('./api/sms.js');
const handlerSms = require('./controllers/handlerSmsObj');
const app = express();
let handlerSmsClass = new handlerSms,
    crosOptions = {
      "origin": "*",
      "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
      "preflightContinue": false,
      "optionsSuccessStatus": 204
    }
handlerSmsClass.setData()
// API Dispatch
app.use(morgan('dev'));
app.use(function(req, res, next) {
  res.header('Content-Type','application/json');
  next();
});
app.use(cors(crosOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/api', smsApi);


app.listen(process.env.PORT || 8080);