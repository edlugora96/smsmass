//Dependecies
const express = require('express');
const timeout = require('connect-timeout');
//Controllers
const ctrlSms = require('../controllers/sms');

//Express router
const Router = express.Router();

//Passport Config
const {isAuth} = require('../passport/localAuth');
// const {isAuthJWT} = require('../passport/JWTAuth');
const {sendCtrl} = require('../controllers/sms');

Router.post('/send', timeout('86400s'), isAuth, sendCtrl, ctrlSms.sendSms);

module.exports = Router;
