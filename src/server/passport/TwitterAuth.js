// const jwt                 = require('jsonwebtoken');
// const redis        = require('redis');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const {twitter}              = require('../services/globalConfig');
// const redisCli = redis.createClient();

const opts = {
  ...twitter
};

function passportTwitterIni(app) {
  const twitterStrat =  new TwitterStrategy( opts,
  (accessToken, refreshToken, profile, done) => {
      console.log(accessToken, refreshToken, profile);
      return done(false, profile);
      // User.findOrCreate({ twitterId: profile.id }, function (err, user) {
      //   return done(err, user);
      // });
  });
  passport.use('twitter',twitterStrat);
}
module.exports = {
  passportTwitterIni
};