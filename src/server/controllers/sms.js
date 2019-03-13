const mongoose       = require('mongoose');
// const HandlerSmsObj  = require ('../services/atSMS.js');
const SMS            = require('../mongo/modelSms');

async function saveSMS(req) {
  let newSMS = new SMS();
  newSMS.sms = req.body.sms;
  newSMS.result = req.body.result;
  newSMS.userId = mongoose.Types.ObjectId(req.user._id);
  const smsStored = await newSMS.save();
  return {
    status: 200,
    message: 'Successfully save SMS',
    sms: smsStored
  };
}

function updateSMS(req) {
  let smsId = req.sms.sms._id;
  let update = req.body.upSms;
  let id = mongoose.Types.ObjectId(smsId);
  SMS.findByIdAndUpdate(id, update, (err, smsUpdated) => {
    if (err) {
      return {
        status: 500,
        message: String(err)
      };
    } else {
      return {
        status: 200,
        sms: smsUpdated
      };
    }
  });
}
// const HandlerSmsMass = new HandlerSmsObj();

module.exports = {
  saveSMS,
  updateSMS,
};