//Dependecies
const express = require('express');
const bodyParser = require('body-parser');

//Controllers
const userCtrl = require('../controllers/user.js')
const auth = require('../middlewares/auth.js')

//Express router
const Router = express.Router();


Router.get('/getAll', userCtrl.getUsers)
Router.get('/get/:UserId', userCtrl.getUser)
Router.post('/save', userCtrl.saveUser)
Router.put('/update/:UserId', userCtrl.updateUser)
Router.delete('/delete/:UserId', userCtrl.deleteUser)
Router.post('/signup', userCtrl.signUp)
Router.post('/signin', userCtrl.signIn)
Router.get('/private', auth, (req, res) => {
  res.status(200).send({ message: 'Tienes acceso' })
})


module.exports = Router;
