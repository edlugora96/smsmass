// const mongoose      = require('mongoose');
const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// const dbAuth        = require('../mongo/db-connection');
const userSchema   = require('../mongo/modelUser');
// const User                = require('../mongo/modelUser.js');

// const config = require('../services/globalConfig');

function passportIni (app) {
  const localOptios = {
    usernameField: 'user',
    passwordField: 'password',
    passReqToCallback: true
  };
  const localSignIn =  new LocalStrategy(
    localOptios,
    async (req, user, password, done) =>{
      const connect = req.app.get('userManager');
      const User = connect.model('user',userSchema);
      try {
        const userFound = await User.aggregate([
          { '$match': { 'cnames': user } },
          {
            $lookup:
            {
              from: 'userscreds',
              localField: 'userCredId',
              foreignField: 'userId',
              as: 'cred'
            }
          },
          {
            '$project' : {
              userCredId:0,
              cred:{
                cne:0,
                userId:0,
                ivss:0,
                _id:0,
                __v:0,
              }
            }
          }
        ]);
        let userData = userFound&&Object.assign({},...userFound);
            userData.cred = userData&&Object.assign({},...userFound[0].cred);
        const comparatePass = await User.comparePassword(userData.password[userData.password.length-1], password);
        delete userData.password;
        if(!userData){
          return done(null, false, {message:`${user} Usuario no registrado.`});
        }
        else if (!comparatePass)
        {
          return done(null, false, {message: 'Error desconocido.'});
        }
        return done(null, userData);
      } catch (error) {
        return done(error,false);
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