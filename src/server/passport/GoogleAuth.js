// const jwt                 = require('jsonwebtoken');
// const redis        = require('redis');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const {google}              = require('../services/globalConfig');
const userSchema = require('../mongo/modelUser');
// const redisCli = redis.createClient();

const opts = {
  ...google
};

async function passportGoogleIni(app) {
  const googleStrat =  new GoogleStrategy( opts,
  (token, tokenSecret, profile, done) => {
    const User = app.get('userManager').model('users',userSchema);
    const userFound = User.findOne({cnames:profile.id});
    console.log(userFound);
    return done(true, null);
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return done(err, user);
      // });
  });
  passport.use('google',googleStrat);
}
module.exports = {
  passportGoogleIni
};