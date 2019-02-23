const mongoose = require('mongoose');
const User = require('../mongo/modelUser')
const service = require('../services')
const bcrypt = require('bcrypt-nodejs')

function signUp (req, res) {
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
    password: req.body.password
  })

  user.save((err) => {
    if (err) return res.status(500).send({ message: `Error al crear el usuario: ${err}` })

    return res.status(201).send({ token: service.createToken(user) })
  })
}

function signIn (req, res) {
  User.find({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send({ message: err })
    if (!user) return res.status(404).send({ message: 'No existe el usuario' })

    req.user = user
    res.status(200).send({
      message: 'Te has logueado correctamente',
      token: service.createToken(user)
    })
  })
}

function getUser (req, res) {
  let userId = req.params.UserId;
  let id = mongoose.Types.ObjectId(userId);
  User.findById(id, (err, user) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!user) return res.status(404).send({message: `El usuario no existe`})

    res.status(200).send({ user })
  })
}

function getUsers (req, res) {
  User.find({}, (err, users) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!users) return res.status(404).send({message: 'No existen los usuarios'})

    res.send(200, { users })
  })
}

function saveUser (req, res) {
  let user = new User()
  user.name = req.body.name;
  user.lastName = req.body.lastName;
  user.avatar = req.body.avatar;
  user.email = req.body.email;
  user.phone = req.body.phone
  user.password = req.body.password;
  user.sex = req.body.sex;
  user.description = req.body.description;
  user.social = req.body.social;
  user.save((err, userStored) => {
    if (err) res.status(500).send({message: String(err)})
    else res.status(200).send({ user: userStored })
  })
}

function updateUser (req, res) {
  let userId = req.params.UserId
  let update = req.body;
  let id = mongoose.Types.ObjectId(userId);
  User.findBeforeUpdate(id, update, (err, userUpdated) => {
    if (err)
      res.status(500).send({message: String(err)})
    else
      res.status(200).send({ user: userUpdated })
  })
}

function deleteUser (req, res) {
  let userId = req.params.userId
  let id = mongoose.Types.ObjectId(userId);

  User.findById(id, (err, user) => {
    if (err) res.status(500).send({message: `Error al borrar el usuario: ${err}`})

    User.remove(err => {
      if (err) res.status(500).send({message: `Error al borrar el usuario: ${err}`})
      res.status(200).send({message: 'El usuario ha sido eliminado'})
    })
  })
}

module.exports = {
  getUser,
  getUsers,
  saveUser,
  updateUser,
  deleteUser,
  signUp,
  signIn
}
