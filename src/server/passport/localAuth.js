// const mongoose      = require('mongoose');
const passport            = require('passport');
const LocalStrategy       = require('passport-local').Strategy;
const User                = require('../mongo/modelUser.js');

function passportIni (app) {
  const localOptios = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  };
  const localSignIn =  new LocalStrategy(
    localOptios,
    async (req, email, password, done) =>{
      try {
        const userFound = await User.findOne({'email': email}).select('backgorund avatar verifiedUser monthlySMS sendSMS activeOrder notifications signupDate social _id phone name lastName email sex password');
        // const comparatePass = await User.comparePassword(userFound.password[userFound.password.length-1], password);
        // console.log(comparatePass, userFound.password[userFound.password.length-1], password);
        delete userFound.password;
        if(!userFound){
          return done(null, false, {message:`${email} User not found.`});
        }
        else if (false)
        {
          return done(null, false, {message: 'Error to Sign in.'});
        }
        return done(null, userFound);
      } catch (error) {
        done(error,false);
      }
    }
    );
    passport.use(localSignIn);
}

function isAuth (req, res, next) {
  if (req.isAuthenticated()){
    return next();
  }
  res.status(401).send({
    message: 'You are not authorized to be here, You need Sign in.'
  });
}

module.exports = {
  passportIni,
  isAuth
};