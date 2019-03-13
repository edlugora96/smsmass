//Dependecies
const express = require('express');
const timeout = require('connect-timeout');
//Controllers
const { sendSms } = require('../middleware/sms');

//Express router
const Router = express.Router();

//Passport Config
const {isAuth} = require('../passport/localAuth');
// const {isAuthJWT} = require('../passport/JWTAuth');
const {sendCtrl} = require('../middleware/sms');

Router.post('/send', timeout('86400s'), isAuth, sendCtrl, sendSms);

module.exports = Router;
