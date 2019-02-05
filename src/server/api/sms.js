//Dependecies
const express = require('express');
const bodyParser = require('body-parser');

//Controllers
const sms = require('../controllers/sms');

//Express router
const Router = express.Router();


Router.post('/sendSms', sms.sendSms)
Router.get('/readSms', sms.readSms)

module.exports = Router;
