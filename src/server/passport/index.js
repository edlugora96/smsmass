const passport = require('passport');
const redis        = require('redis');
const { passportJWTIni } = require('./JWTAuth');
const { passportIni } = require('./localAuth');
const { passportGoogleIni } = require('./GoogleAuth');
const { passportFacebookIni } = require('./FacebookAuth');
const config = require('../services/globalConfig');
const jwt    = require('jsonwebtoken');
const redisCli = redis.createClient();

const passportConfig = function (app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done)=>{
    const payload = jwt.decode(user);
    redisCli.hset(payload._id, config.SECRET,user);
    redisCli.expire(payload._id, 7 * 60 * 60);
    done(null, user );
  });
  passport.deserializeUser((user, done)=>{
    console.log('cuando ocurre esto');
    done(null,user);
  });
  passportIni(app);
  passportJWTIni(app);
  passportGoogleIni(app);
  passportFacebookIni(app);
};

module.exports = passportConfig;