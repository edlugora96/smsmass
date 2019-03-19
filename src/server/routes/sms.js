//Dependecies
const express = require('express');
const timeout = require('connect-timeout');
//Controllers
const { sendSms, sendCtrl, sendNext } = require('../middleware/sms');
const { redisStore } = require('../middleware/redis');
const { sendEmail } = require('../services/mail');

//Express router
const Router = express.Router();

//Passport Config
const {isAuthJWT} = require('../passport/JWTAuth');

Router.post('/send', timeout('86400s'), isAuthJWT, sendCtrl, sendSms);
Router.post('/verify/phone', timeout('86400s'), isAuthJWT, sendCtrl, redisStore, sendNext);
Router.post('/verify/email', timeout('86400s'), isAuthJWT, redisStore, sendEmail);

module.exports = Router;
