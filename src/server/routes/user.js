//Dependecies
const express = require('express');
const passport = require('passport');
//Controllers
const userCtrl = require('../controllers/user');
//Express router
const Router = express.Router();

//Passport Config
// const {isAuth} = require('../passport/localAuth');
const {isAuthJWT} = require('../passport/JWTAuth');

Router.get('/getAll', userCtrl.getUsers);
Router.get('/get/:UserId', userCtrl.getUser);
Router.post('/signUp', userCtrl.signUp);
Router.put('/update/:UserId', userCtrl.updateUser);
Router.delete('/delete/:UserId', userCtrl.deleteUser);
Router.post('/login', userCtrl.login);
Router.get('/logout', userCtrl.logout);

Router.get('/auth/facebook', passport.authenticate('facebook'));
Router.get('/facebookcallback',
  passport.authenticate('facebook', { failureRedirect: '/login' }), (req,res)=>{
    res.status(200).send({message:'inicio con facebook'});
  });

Router.get('/auth/google', passport.authenticate('google',{ scope: ['profile'] }));
Router.get('/googlecallback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    console.log('algo');
    res.redirect('/');
  });


Router.get('/isauth', isAuthJWT, (req, res)=>{
  return res.status(200).send({message:'todo bien'});
});
Router.get('/userInfo',isAuthJWT, (req, res)=>{
  res.json(req.user);
});
Router.post('/manageUpload' , function(req, res) {
  console.log(Object.keys(req), req.body, req.files);
  return res.status(200).send({message:'todo bien'});
});


module.exports = Router;