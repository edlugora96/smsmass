const jwt                 = require('jsonwebtoken');
const passport            = require('passport');
const JwtStrategy         = require('passport-jwt').Strategy;
const ExtractJwt          = require('passport-jwt').ExtractJwt;
const config              = require('../services/globalConfig');
const redis        = require('redis');
const redisCli = redis.createClient();
// const userCtrl            = require('../controllers/user');

let   opts                = {};
      opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
      opts.secretOrKey    = config.PUBLIC;

function passportJWTIni(app) {
  const jwtStra =  new JwtStrategy(opts, async (token, done) => {
    try {
      return done(null, token);
    } catch (error) {
      done(error);
    }
  });
  passport.use('jwt',jwtStra);
}

function isAuthJWT(req, res, next) {
  let token = req.headers.authorization;
  token = token&&token.replace(/bearer /gmi, '');
  try {
    const payload= jwt.verify(token, config.PUBLIC, config.tokenSignOpt);
    redisCli.hget(payload._id,config.SECRET, (err, value)=>{
      if(value===token){
        next();
      }else {
        res.status(401).send({message:'Sin autorización.'});
      }
    });
  }
  catch(err) {
    res.status(401).send({message:'Sin autorización.'});
  }
}

module.exports = {
  passportJWTIni,
  isAuthJWT
};