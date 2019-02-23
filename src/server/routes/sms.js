//Dependecies
const express = require('express');
const bodyParser = require('body-parser');
const timeout = require('connect-timeout');
//Controllers
const sms = require('../controllers/sms');

//Express router
const Router = express.Router();


Router.post('/send', timeout('86400s'), sms.sendSms)

module.exports = Router;
