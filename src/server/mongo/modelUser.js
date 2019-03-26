const mongoose       = require('mongoose');
const bcrypt         = require('bcrypt-nodejs');
const arrayCodePhone = require('../services/onlyCodePhone.js');

const Schema         = mongoose.Schema;
const regExpPassword = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})';
const img = '(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})';
const regExpOutput = (regExp)=>new RegExp(regExp,"g");
const matchArray = (regExp, elemet) => {
  if (elemet.length===0) {
    return true;
  } else if (elemet.length>1) {
    return false;
  } else if (elemet==='') {
    return false;
  } else {
    return regExpOutput(regExp).test(elemet[0]);
  }
};
const uniqueValuePhone = (elemet) => {
  main: for (var i = 0; i < elemet.length; i++) {
    for (var j = 0; j < elemet.length; j++) {
      if (i === j || i < j) {
        continue;
      } else if (!elemet[i].numberPhone) {
        break main;
      } else if (elemet[i].numberPhone === elemet[j].numberPhone) {
        return false;
      } else if (elemet[i].link==='main' || elemet[j].link==='main'){
        if (elemet[i].link=== elemet[j].link) {
          return false;
        }
      }
    }
  }
  return true;
};

const userSchema = new Schema({
  userCredId: {
    type:String,
    unique: true,
    select:false
  },
  name    : {type: String, require:[true, 'Este campo es requerido']},
  lastName: {type: String, require:[true, 'Este campo es requerido']},
  dni: {type: String, require:[true, 'Este campo es requerido']},
  backgorund  : {
    type:[String],
    validate: [matchArray.bind(this, img), 'La Url de la imagen no es valida']
  },
  password:{
    type:[String],
    require: [true, 'Este campo es requerido'],
    validate: [matchArray.bind(this, regExpPassword), 'La contraseña debetener minimo:\n2 letras minusculas.\n2 letras mayuculas.\n2 caracteres especiales.\nY tener mas de 8 caracteres.'],
    select:false
  },
  cnames:{
    type:[String],
    require: [true, 'Este campo es requerido']
  },
  avatar  : {
    type:[String],
    validate: [matchArray.bind(this, img), 'La Url de la imagen no es valida']
  },
  email   : {
    type     : String,
    lowercase: true,
    required : [true, 'Este campo es requerido'],
    unique   : [true, 'Otro usuario está usando este correo'],
    match : [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email ingresado es invalido']
  },
  phone: {
    type: [{
      codeArea: {
        type    : String,
        required: [true, 'Este campo es requerido'],
        default: '+58',
        enum    : arrayCodePhone
      },
      numberPhone: {
        type    : String,
        required: [true, 'Este campo es requerido'],
        match: [/^(04|02)([\d+]{9})$/, 'El formato valido para el Nro. telefonico es 04XXXXXXXXX']
      },
      verified: {
        type   : Boolean,
        default: false,
      },
      link: {
        type   : String,
        enum   : ['main','minor','ofice','home','work','local'],
        default: 'minor'
      }
    }],
    validate: [uniqueValuePhone, 'No puede haber Nros telefonicos repetidos, ni mas de un telefono principal']
  },
  notifications: { type: [String] },
  sex          : { type:String, enum: ['m','f','o'], required:[true, 'Este campo es requerido']},
  description  : { type:String },
  birthdate    : {type:Date, select: false},
  social       : []
});

function comparePassword (hash, candidatePassword){
  return bcrypt.compareSync(candidatePassword, hash);
}

userSchema.pre('save', function(next) {
  let           salt = bcrypt.genSaltSync(10);
  let           hash = bcrypt.hashSync(this.password[0], salt);
  this.password[0]   = hash;
  next();
});

userSchema.pre('findOneAndUpdate', async function(next) {
  if (this._update.password&&this._update.passwordnew&&this._update.passwordconfnew) {
    const { password } = await this.model.findById(this._update.id).select('password');
    const comparate = bcrypt.compareSync(this._update.password, password[password.length-1]);
    if(comparate&&this._update.passwordnew===this._update.passwordconfnew&&this._update.password!==this._update.passwordnew){
      let salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(this._update.passwordnew, salt);
      this._update.password.$push = hash;
    }
  }
  delete this._update.id;
  this._update.password && delete this._update.password;
  this._update.passwordnew && delete this._update.passwordnew;
  this._update.passwordconfnew && delete this._update.passwordconfnew;
  this.options.runValidators = true;
  next();
});

userSchema.statics.comparePassword = comparePassword;


// let  User = mongoose.model(collection, userSchema);
// User = new User();


module.exports = userSchema;