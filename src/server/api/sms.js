//Dependecies
const express = require('express');
const bodyParser = require('body-parser');

//Controllers
const sms = require('../controllers/sms');

//Express router
const Router = express.Router();

//Middleware
const handlerSMSlong = require('../middleware/handlerSMSlong')

Router.post('/sendSms', handlerSMSlong, sms.sendSms)
Router.get('/readSms', sms.readSms)

module.exports = Router;
