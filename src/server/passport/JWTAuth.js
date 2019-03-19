const jwt                 = require('jsonwebtoken');
const passport            = require('passport');
const JwtStrategy         = require('passport-jwt').Strategy;
const ExtractJwt          = require('passport-jwt').ExtractJwt;
const config              = require('../services/globalConfig');
const userCtrl            = require('../controllers/user');

let   opts                = {};
      opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
      opts.secretOrKey    = config.SECRET_TOKEN;

function passportJWTIni(app) {
  const jwtStra =  new JwtStrategy(opts, async function (jwt_payload, done) {
    return done(null, jwt_payload);
  });
  passport.use(jwtStra);
}

function isAuthJWT(req, res, next) {
  passport.authenticate('jwt', {session: true}, function (err, token) {
    if (err || !token) {
      let tokenUnAuth = req.headers.authorization;
      tokenUnAuth = tokenUnAuth && tokenUnAuth.replace(/bearer /gmi, '');
      let userTokenUnAuth = jwt.decode(tokenUnAuth, config.SECRET_TOKEN);
      let now = Date.now() / 1000;
      if (userTokenUnAuth && now > userTokenUnAuth.exp) {
        req.user = userTokenUnAuth;
        userCtrl.logout(req, res);
      }
      else
      {
        res.status(401).send({message:'You are not authorized to be here, You need Sign in.'});
      }
    }
    else{
      req.user = token;
      if (/users\/isauth/.test(req.originalUrl)) {
        res.status(200).send({message:'Authorized'});
      } else {
        next()
      }
    }
  })(req, res, next);
}

module.exports = {
  passportJWTIni,
  isAuthJWT
};