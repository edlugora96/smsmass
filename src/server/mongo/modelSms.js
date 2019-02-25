const mongoose       = require('mongoose');
const Schema         = mongoose.Schema;
const smsSchema = new Schema({
  sms: {
    type: {
      message: { type:String },
      phone: { type:String }
    }
  },
  result: { type: String },
  dateToSend: { type: Date, default: Date.now() },
  userId    : { type: Schema.Types.ObjectId, require: true }
});

const Sms = mongoose.model('Messages', smsSchema);

module.exports = Sms;

