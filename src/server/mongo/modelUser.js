const mongoose       = require('mongoose');
const bcrypt         = require('bcrypt-nodejs');
const arrayCodePhone = require('../services/onlyCodePhone.js');
const Schema         = mongoose.Schema;
const userSchema     = new Schema({
  name    : {type: String, require:true},
  lastName: {type: String, require:true},
  avatar  : [String],
  email   : {
    type     : String,
    lowercase: true,
    required : true,
    unique   : true
  },
  verifiedUser: {
    type   : Boolean,
    default: false,
  },
  phone: {
    type: [{
      codeArea: {
        type    : String,
        required: true,
        enum    : arrayCodePhone
      },
      numberPhone: {
        type    : Number,
        required: true
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
    }]
  },
  monthlySMS   : { type: Number, default: 25 },
  sendSMS      : { type: Number, default: 0 },
  activeOrder  : { type: [String], default: 0 },
  notifications: { type: [String] },
  password     : { type: [String], select: false, required:true},
  sex          : { type:String, enum: ['m','f','o'], required:true},
  description  : { type:String },
  signupDate   : { type: Date, default: Date.now() },
  lastLogin    : Date,
  social       : []
});

function validateCorrectData(type, objToValidate) {
  let validatePromise = new Promise((resolve, reject) => {
    let errors = [];
    switch (type) {
      case 'email':
        let email = objToValidate;
        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)){
          errors.push(`${email} it is not a valid Email adress!`);
        }
      break;
      case 'phone':
        let phone = objToValidate;
        if (Array.isArray(phone)) {
          phone.forEach((cell, index) => {
            for (var i = 0; i < phone.length; i++) {
              if (i === index || i < index){
                continue;
              }
              if (phone[i].numberPhone === cell.numberPhone){
                errors.push(`Duplicate Number Phone: ${phone[i].numberPhone}`);
              }
              if (cell.link === 'main' && phone[i].link === cell.link){
                errors.push(`Duplicate Main Phone: ${cell.numberPhone} already  is Main`);
              }
            }
            if (arrayCodePhone.includes(cell.codeArea) === false){
              errors.push(`"${cell.codeArea}" it is not a valid Code Area`);
            }
            if (typeof cell.numberPhone !== 'number'){
              errors.push(`${cell.numberPhone} it is not a valid Number Phone`);
            }
            if (['main', 'minor', 'ofice', 'home', 'work', 'local'].includes(cell.link) === false){
              errors.push(`"${cell.link}" it is not a valid reference`);
            }
          });
        } else {
          if (arrayCodePhone.includes(phone.codeArea) === false){
            errors.push(`"${phone.codeArea}" it is not a valid Code Area`);
          }
          if (['main', 'minor', 'ofice', 'home', 'work', 'local'].includes(phone.link) === false){
            errors.push(`"${phone.link}" it is not a valid reference`);
          }
          if (typeof phone.numberPhone !== 'number'){
            errors.push(`${phone.numberPhone} it is not a valid Number Phone`);
          }
        }
      break;
      case 'avatar':
        let avatar = objToValidate;
        if (avatar.length > 1){
          errors.push('Too Many images');
        }
        if (!/\.(png|jpg|gif|ico|svg)$/.test(avatar)){
          errors.push(`${avatar} it is not a valid image format!`);
        }
        break;
      case 'password':
        let password = objToValidate;
        if (password.length > 1){
          errors.push('Too Many passwords');
        }
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(password)){
          errors.push(`${password} The password must have a minimum:\n2 lowercase letters.\n2 uppercase letters.\n2 special characters.\nIt must be greater than 8 characters.`);
        }
      break;
      default:
        return false;
    }
    errors = errors.join('\n');
    if (errors.length > 0) {
      reject(errors);
    }
    resolve();
  });
  return validatePromise;
}

userSchema.pre('save', function(next) {
  User.find({'email':this.email}, (err, userFound)=>{
    if (userFound.length>0){
      next(new Error(`Another user is using this email: ${this.email}`));
    }
    let validatePromises = [];
    if (this.email){
      validatePromises.push(validateCorrectData('email', this.email));
    }
    if (this.phone){
      validatePromises.push(validateCorrectData('phone', this.phone));
    }
    if (this.avatar){
      validatePromises.push(validateCorrectData('avatar', this.avatar));
    }
    if (this.password){
      validatePromises.push(validateCorrectData('password', this.password));
    }
    if (validatePromises.length>0)
    {
      Promise.all(validatePromises).then(()=>
      {
        let           salt = bcrypt.genSaltSync(10);
        let           hash = bcrypt.hashSync(this.password[0], salt);
        this.password[0]   = hash;
        next();
      })
      .catch((err)=>
      {
        next(new Error(err));
      });
    }
  });
});

userSchema.statics.findBeforeUpdate = function (query, update,callback)
{
  let flag = 0;
  update.$push = {};
  if(update.password&&update.confirmPassword){
    flag++;
    let salt                  = bcrypt.genSaltSync(10);
    let hash                  = bcrypt.hashSync(update.password, salt);
        update.$push.password = hash;
    delete update.password;
  }
  if(update.avatar){
    flag++;
    update.$push.avatar = update.avatar;
    delete update.avatar;
  }
  if (!flag){
    delete update.$push;
  }
  let validatePromises = [];
  if (update.email){
    validatePromises.push(validateCorrectData('email', update.email));
  }
  if (update.phone){
    validatePromises.push(validateCorrectData('phone', update.phone));
  }
  if (update.$push&&update.$push.avatar){
    validatePromises.push(validateCorrectData('avatar', update.$push.avatar));
  }
  if (update.$push&&update.$push.password){
    validatePromises.push(validateCorrectData('password', update.$push.password));
  }
  if (validatePromises.length>0)
  {
    Promise.all(validatePromises).then(()=>
    {
      this.findByIdAndUpdate(query, update)
        .exec(function(err, res) {
            return callback(false, res);
        });
    })
    .catch((err)=>
    {
      return callback(err);
    });
  }
};


userSchema.statics.comparePassword = async function (query, candidatePassword)
{
  let pass = await this.findOne(query).select('password');
  pass = pass.password.toString();
  return bcrypt.compareSync(candidatePassword, pass);
};

const User = mongoose.model('Users', userSchema);

module.exports = User;
