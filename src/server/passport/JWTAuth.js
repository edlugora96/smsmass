const passport            = require('passport');
const JwtStrategy         = require('passport-jwt').Strategy;
const ExtractJwt          = require('passport-jwt').ExtractJwt;
const config              = require('../globalConfig');
let   opts                = {};
      opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
      opts.secretOrKey    = config.SECRET_TOKEN;

function passportJWTIni(passport) {
  const jwtStra =  new JwtStrategy(opts, async function (jwt_payload, done) {
    return done(null, jwt_payload);
  });
  passport.use(jwtStra);
}

function isAuthJWT(req, res, next) {
  passport.authenticate('jwt', {session: false}, function (err, token) {
    if (err || !token) {
      res.status(401).send({message:'You are not authorized to be here, You need Sign in.'});
    }
    else{
      req.user = token;
      next();
    }
  })(req, res, next);
}

module.exports = {
  passportJWTIni,
  isAuthJWT
};