const mongoose = require('mongoose');
const passport = require('passport');
const jwt      = require('jsonwebtoken');
const User     = require('../mongo/modelUser');
const config   = require('../services/globalConfig');

function signIn(req, res) {
  passport.authenticate('local', function (err, user,info){
    if (err) {return res.status(500).send({message: String(err)});}
    if (!user) {
      return res.status(400).send({
        message: `Loggin invalid Server: ${info}`
      });
    }
    let seccionUsers = req.app.get('seccionUsers');
    if (user._id in seccionUsers) {
      return res.status(401).send({
        message: `Existe otro usuario usando esta cuenta`
      });
    }
    req.logIn(user, function (err) {
      if (err) { return res.status(500).send({ message: String(err) }); }
      const token = jwt.sign(user.toJSON(), config.SECRET_TOKEN, { expiresIn: req.body.remember ? '7d' : '7h' });
      let addUserIo = req.app.get('addUserIo');
      console.log(addUserIo);
      addUserIo && addUserIo(token);
      res.status(200).send({ message: 'Succes loggin', token: `bearer ${token}` });
    });
  })(req, res);
}

function logout(req, res) {
  let usersIo = req.app.get('usersIo');
  usersIo && usersIo[req.user._id].emit('logout', ['out', req.user._id]);
  let seccionUsers = req.app.get('seccionUsers');
  seccionUsers && delete seccionUsers[req.user._id];
  req.app.set('seccionUsers', seccionUsers);
  req.logout();
  res.status(200).send({message: 'Succes logout'});
}

async function getUser (req, res) {
  let userId = req.params.UserId || req.userQ.id;
  let id = mongoose.Types.ObjectId(userId);
  const user = await User.findById(id);
  if (user){
    if (res) {
      res.status(200).send({user});
    } else {
      return user;
    }
  }
  else{
    if (res) {
      return res.status(404).send({message: 'User not found'});
    }else{
      return {status:404,message: 'User not found'};
    }
  }
}

function getUsers (req, res) {
  User.find({}, (err, users) => {
    if (err) {return res.status(500).send({message: `Error al realizar la petición: ${err}`});}
    if (!users) {return res.status(404).send({message: 'No existen los usuarios'});}

    res.send(200, { users });
  });
}

function signUp (req, res) {
  let newUser = new User();
  newUser.name = req.body.name;
  newUser.lastName = req.body.lastName;
  newUser.avatar = req.body.avatar;
  newUser.email = req.body.email;
  newUser.ci = req.body.ci;
  newUser.phone = req.body.phone;
  newUser.birthdate = req.body.birthdate;
  newUser.password = req.body.password;
  newUser.sex = req.body.sex;
  newUser.description = req.body.description;
  newUser.social = req.body.social;
  newUser.notifications = req.body.notifications;
  newUser.monthlySMS = req.body.monthlySMS||25;
  newUser.sendSMS = req.body.sendSMS||0;
  newUser.save((err) => {
    if (err) {res.status(500).send({message: err.errors});}
    else {
      req.logIn(newUser, (err)=>{
        if (err)
          {res.status(500).send({message: err.errors});}
        const token = jwt.sign(newUser.toJSON(), config.SECRET_TOKEN, {
          expiresIn: '7h'
        });
        res.status(200).send({message:'Successfully created user', token:`bearer ${token}`});
      });
    }
  });
}

function updateUser (req, res) {
  let userId = req.params.UserId || req.userQ.id;
  let id = mongoose.Types.ObjectId(userId);
  let update = {};
      update.id = id;
      update.backgorund      = req.body.backgorund;
      update.avatar          = req.body.avatar;
      update.password        = req.body.password;
      update.phone           = req.body.phone;
      update.name            = req.body.name;
      update.lastName        = req.body.lastName;
      update.sex             = req.body.sex;
      update.passwordnew     = req.body.passwordnew;
      update.passwordconfnew = req.body.passwordconfnew;
      !req.body.backgorund && delete update.backgorund
      !req.body.avatar && delete update.avatar
      !req.body.password && delete update.password
      !req.body.phone && delete update.phone
      !req.body.name && delete update.name
      !req.body.lastName && delete update.lastName
      !req.body.sex && delete update.sex
      !req.body.passwordnew && delete update.passwordnew
      !req.body.passwordconfnew && delete update.passwordconfnew
  User.findOneAndUpdate(id, update)
    .exec((err, userUpdated) => {
      if (err)
      {
        if(res){
          res.status(500).send({message: err.errors});
        }
        else{
          return { status:500,message: err.errors };

        }
      }
      else
      {
        if(res){
          const token = jwt.sign(userUpdated.toJSON(), config.SECRET_TOKEN, {
            expiresIn: '7h'
          });
          res.status(200).send({message:'Successfully created user', token:`bearer ${token}`});
        }
        else{
          return { status:200,user: userUpdated };

        }
      }
    });
}

function deleteUser (req, res) {
  let userId = req.params.userId;
  let id = mongoose.Types.ObjectId(userId);

  User.findById(id, (err) => {
    if (err) {res.status(500).send({message: `Error al borrar el usuario: ${err}`});}

    User.remove(err => {
      if (err) {res.status(500).send({message: `Error al borrar el usuario: ${err}`});}
      res.status(200).send({message: 'El usuario ha sido eliminado'});
    });
  });
}

module.exports = {
  getUser,
  getUsers,
  logout,
  updateUser,
  deleteUser,
  signUp,
  signIn
};
