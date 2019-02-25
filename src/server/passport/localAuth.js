// const mongoose      = require('mongoose');
const LocalStrategy       = require('passport-local').Strategy;
const User                = require('../mongo/modelUser.js');

function passportIni (passport) {
  passport.serializeUser((user, done)=>{
    done(null, user);
  });
  passport.deserializeUser((user, done)=>{
      done(null,user);
  });
  const localOptios = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  };
  const localSignIn =  new LocalStrategy(
    localOptios,
    async (req, email, password, done) =>{
      try {
        const userFound = await User.findOne({'email': email});
        if(!userFound){
          return done(null, false, {message:`${email} User not found.`});
        }
        else if (!User.comparePassword({email:email},password))
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
  isAuth,
  passportIni
};