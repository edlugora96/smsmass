const mongoose = require('mongoose');
const passport = require('passport');
const nanoid = require('nanoid');
const jwt    = require('jsonwebtoken');
const config = require('../services/globalConfig');
const userCredsSchema = require('../mongo/modelUserCred');
const userSchema   = require('../mongo/modelUser');
// const dbAuth = require('../mongo/db-connection');

function login(req, res) {
  (passport.authenticate('local', { session: false }, async (err,user,message)=>{
    if (user) {
      const token = jwt.sign(user, config.SECRET, config.tokenSignOpt);
      req.logIn(token, function(err) {
        if (err) {
          return res.status(500).send({message:`Hubo un error: ${message||err}`});
        }
        return res.status(200).send({message:`bearer ${token}`});
      });
    }else {
      return res.status(500).send({message:`Hubo un error: ${message||err}`});
    }
  }))(req,res);
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
  const user = await user.findById(id);
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
  user.find({}, (err, users) => {
    if (err) {return res.status(500).send({message: `Error al realizar la petición: ${err}`});}
    if (!users) {return res.status(404).send({message: 'No existen los usuarios'});}

    res.send(200, { users });
  });
}


async function signUp (req, res) {
  let userId = nanoid();
  const connectUser = req.app.get('userManager');
  const connectUserCreds = req.app.get('userCredsManager');
  const User = connectUser.model('users', userSchema);
  const UserCreds = connectUserCreds.model('userscreds', userCredsSchema);
  User.findOne({$or:[{cnames:req.body.user},{dni:req.body.user}]}, (err, user)=>{
    if(!err&&!user){
      let newUser = new User();
        newUser.userCredId = userId;
        newUser.name = req.body.name;
        newUser.lastName = req.body.lastName;
        newUser.avatar = req.body.avatar;
        newUser.email = req.body.user;
        newUser.phone = req.body.phone;
        newUser.birthdate = req.body.birthdate;
        newUser.sex = req.body.sex;
        newUser.description = req.body.description;
        newUser.social = req.body.social;
        newUser.password = req.body.password;
        newUser.dni = req.body.dni;
        newUser.cnames = [req.body.user, newUser.dni];
      let newCredsUser = new UserCreds();
        newCredsUser.userId = userId;
        newCredsUser.save((err) => {
          if (err) {
            console.log(err, '0');
            res.status(500).send({message: err.errors});
          }
          else {
            newUser.save((err) => {
              if (err) {
                console.log(err, '1');
                res.status(500).send({message: err.errors});
              }
              else {
                res.status(200).send({message:'Usuario creado exitosamente.'});
              }
            });
          }
        });
    }
    else {
      res.status(401).send({message:`Existe otro usuario registrdo bajo este usuario: ${req.body.user} o DNI: ${req.body.dni}`});
    }
    // res.status(200).send({message:'ok',err,user});
  });
  /*

  let pwd = req.body.password;

  const saveNewUser = ({connect,customData},err)=>{
    const User = connect.model(userId, userSchema);
    let newUser = new User();
        newUser._id = 'user';
        newUser.name = req.body.name;
        newUser.lastName = req.body.lastName;
        newUser.avatar = req.body.avatar;
        newUser.email = req.body.user;
        newUser.phone = req.body.phone;
        newUser.birthdate = req.body.birthdate;
        newUser.sex = req.body.sex;
        newUser.description = req.body.description;
        newUser.social = req.body.social;
        newUser.save((err) => {
          console.log(err);
          if (err) {
            res.status(500).send({message: err.errors});
          }
          else {
            connect.base.connection.close();
            res.status(200).send({message:'ok'});
          }
        });
  };
  const createUser = ({connect,customData},err,resolve)=>{
    if (!err) {
      connect.db.eval(`cUser({
        user:"${userId}",
        pwd:"${pwd}",
        role:"${userId}",
        customData:${JSON.stringify(customData)},
      })`, saveNewUser.bind(this,{connect,customData}));
    }
  };
  const createRole = ({connect,customData},err,user) =>{
    if (!err&&!user) {
      connect.db.eval(`cRoleUser({role:"${userId}", collection:"${userId}"})`, createUser.bind(this,{connect,customData}));
    } else {
      res.status(401).send({message:`Existe otro usuario registrdo bajo este usuario: ${req.body.user} o DNI: ${req.body.dni}`});
    }
  };
  const findCnames = (connect) => {
    let customData = {};
        customData.passport = {};
        customData.smswo = {};
        customData.passport.cnames = [req.body.user];
        customData.passport.ivss = [];
        customData.passport.cne = [];
        customData.passport.isVerified = false;
        customData.smswo.sent = 0;
        customData.smswo.sentThisMonth = 0;
        customData.smswo.monthly = 25;
        customData.signupDate = Date.now();
        customData.dni = req.body.dni;
    connect.db.eval('db.loadServerScripts()');
    connect.db.eval(`Mongo().getDB("admin").getCollection("system.users").findOne({$or:[{"customData.passport.cnames":"${req.body.user}"}, {"customData.dni":"${req.body.dni}"}]})`, createRole.bind(this,{connect,customData}));
  };
  const connect = req.app.get('userManager');
  findCnames(connect);*/
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
  user.findOneAndUpdate(id, update)
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

  user.findById(id, (err) => {
    if (err) {res.status(500).send({message: `Error al borrar el usuario: ${err}`});}

    user.remove(err => {
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
  login
};
