//Dependecies
const express = require('express');
// const passport = require('passport');
//Controllers
const userCtrl = require('../controllers/user');
//Express router
const Router = express.Router();

//Passport Config
const {isAuth} = require('../passport/localAuth');
const {isAuthJWT} = require('../passport/JWTAuth');

Router.get('/getAll', userCtrl.getUsers);
Router.get('/get/:UserId', userCtrl.getUser);
Router.post('/signUp', userCtrl.signUp);
Router.put('/update/:UserId', userCtrl.updateUser);
Router.delete('/delete/:UserId', userCtrl.deleteUser);
Router.post('/signIn', userCtrl.signIn);
Router.get('/logout', userCtrl.logout);
Router.get('/userInfo', isAuthJWT, (req, res)=>{
  res.json(req.user);
});


module.exports = Router;