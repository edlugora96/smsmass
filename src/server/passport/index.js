const passport = require('passport');
const { passportJWTIni } = require('./JWTAuth');
const { passportIni } = require('./localAuth');

const passportConfig = function (app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done)=>{
    done(null, user);
  });
  passport.deserializeUser((user, done)=>{
      done(null,user);
  });
  passportIni(app);
  passportJWTIni(app);
};

module.exports = passportConfig;