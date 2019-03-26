const mongoose       = require('mongoose');
// const bcrypt         = require('bcrypt-nodejs');

const Schema         = mongoose.Schema;

const userCredsSchema = new Schema({
  userId: {
    type:String,
    unique: true,
    select:false
  },
  ivss: {
    type:[],
    select:false,
    default:[]
  },
  cne: {
    type:[],
    select:false,
    default:[]
  },
  isVerify:{
    type: Boolean,
    default: false
  },
  smswo:{
    type:{
      sent: {type:Number, default:0},
      sentThisMonth: {type:Number, default:0},
      monthly: {type:Number, default:25}
    }
  },
  singUpDate: {
    type:Date,
    default:Date.now()
  }
});

/*function comparePassword (hash, candidatePassword){
  return bcrypt.compareSync(candidatePassword, hash);
}*/

/*userCredsSchema.pre('save', function(next) {
  let           salt = bcrypt.genSaltSync(10);
  let           hash = bcrypt.hashSync(this.password[0], salt);
  this.password[0]   = hash;
  next();
});

userCredsSchema.pre('findOneAndUpdate', async function(next) {
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
});*/

// userCredsSchema.statics.comparePassword = comparePassword;


// let  User = mongoose.model(collection, userCredsSchema);
// User = new User();


module.exports = userCredsSchema;