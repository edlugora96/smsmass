//Dependecies
const express = require('express');
// const passport = require('passport');
//Controllers
const userCtrl = require('../controllers/user');
//Express router
const Router = express.Router();

//Passport Config
// const {isAuth} = require('../passport/localAuth');
const {isAuthJWT} = require('../passport/JWTAuth');

Router.get('/getAll', isAuthJWT, userCtrl.getUsers);
Router.get('/get/:UserId', isAuthJWT, userCtrl.getUser);
Router.post('/signUp', userCtrl.signUp);
Router.put('/update/:UserId', isAuthJWT, userCtrl.updateUser);
Router.delete('/delete/:UserId',isAuthJWT,  userCtrl.deleteUser);
Router.post('/signIn', userCtrl.signIn);
Router.get('/logout', isAuthJWT, userCtrl.logout);
Router.get('/isauth', isAuthJWT);
Router.get('/userInfo', isAuthJWT, (req, res)=>{
  res.json(req.user);
});


module.exports = Router;