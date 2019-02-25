const mongoose = require('mongoose');
const passport = require('passport');
const jwt      = require('jsonwebtoken');
const User     = require('../mongo/modelUser');
const config   = require('../globalConfig');

function signIn (req, res) {
  // let io = req.app.get('socketio');
  // console.log(io);
 if(req.isAuthenticated()){
   return res.status(400).send({
     message: 'Already session active.'
   });
 }
  passport.authenticate('local', function (err, user,info){
    if(err) {return res.status(500).send({message: String(err)});}
    if (!user) {
      return res.status(400).send({
        message: `Loggin invalid Server: ${info}`
      });
    }
    req.logIn(user, function (err){
      if (err) {return res.status(500).send({message: String(err)});}
      const token = jwt.sign(user.toJSON(), config.SECRET_TOKEN, {expiresIn: 600000});
      res.status(200).send({message: 'Succes loggin',token: `bearer ${token}`});
    });
  })(req, res);
}

function logout(req, res) {
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
  newUser.phone = req.body.phone;
  newUser.password = req.body.password;
  newUser.sex = req.body.sex;
  newUser.description = req.body.description;
  newUser.social = req.body.social;
  newUser.monthlySMS = req.body.monthlySMS||25;
  newUser.sentSMS = req.body.sentSMS||0;
  newUser.save((err) => {
    if (err) {res.status(500).send({message: String(err)});}
    else {
      req.logIn(newUser, (err)=>{
        if (err)
          {res.status(500).send({message: String(err)});}
        const token = jwt.sign(newUser.toJSON(), config.SECRET_TOKEN, {
          expiresIn: 600000
        });
        res.status(200).send({message:'Successfully created user', token:`bearer ${token}`});
      });
    }
  });
}

function updateUser (req, res) {
  let userId = req.params.UserId || req.userQ.id;
  let update = req.body;
  let id = mongoose.Types.ObjectId(userId);
  User.findBeforeUpdate(id, update, (err, userUpdated) => {
    if (err)
    {
      if(res){
        res.status(500).send({message: String(err)});
      }
      else{
        return { status:500,message: String(err) };

      }
    }
    else
    {
      if(res){
        res.status(200).send({ user: userUpdated });
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
