const express = require('express');
const bodyParser = require('body-parser')
const morgan = require('morgan')
const timeout = require('connect-timeout');
const path = require('path');
const smsApi = require('./api/sms.js');
const handlerSms = require('./controllers/handlerSmsObj');
const app = express();
let handlerSmsClass = new handlerSms;
handlerSmsClass.setData()
// API Dispatch
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(timeout(120000));
app.use('/api', smsApi);

app.listen(process.env.PORT || 8080);