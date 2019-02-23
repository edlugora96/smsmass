const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const cors  = require ( 'cors');
const smsApi = require('./routes/sms.js');
const userApi = require('./routes/user.js');
const handlerSms = require('./services/atSMS.js');
const app = express();

let handlerSmsClass = new handlerSms,
    crosOptions = {
      "origin": "*",
      "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
      "preflightContinue": false,
      "optionsSuccessStatus": 204
    }
handlerSmsClass.setData()
.then(e=>{
  handlerSmsClass.read(e)
})

// API Dispatch
app.use(helmet());
app.use(helmet.referrerPolicy({ policy: 'same-origin' }))
app.use(morgan('dev'));
app.use(function(req, res, next) {
  res.header('Content-Type','application/json');
  next();
});
app.use(cors(crosOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/sms', smsApi);
app.use('/users', userApi);

app.disable('x-powered-by');

module.exports = app