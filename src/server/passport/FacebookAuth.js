// const jwt                 = require('jsonwebtoken');
// const redis        = require('redis');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const {facebook}              = require('../services/globalConfig');
const userSchema = require('../mongo/modelUser');
// const redisCli = redis.createClient();
const opts = {
  ...facebook
};

function passportFacebookIni(app) {
  const facebookStrat =  new FacebookStrategy( opts,
  (accessToken, refreshToken, profile, done) => {
    const User = app.get('userManager').model('users',userSchema);
    User.findOne({cnames:profile.id}, (err,userFound)=>{
      console.log(err,userFound);
      return done(true, profile);
    });
      // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      //   return done(err, user);
      // });
  });
  passport.use('facebook',facebookStrat);
}
module.exports = {
  passportFacebookIni
};