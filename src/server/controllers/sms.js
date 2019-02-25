const mongoose       = require('mongoose');
const moment         = require('moment');
const HandlerSmsObj  = require ('../services/atSMS.js');
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
const HandlerSmsMass = new HandlerSmsObj(saveSMS);

async function sendSms (req, res)
{
    let sendingStatus = req.app.get('sendingStatus');
    if (sendingStatus==='end'){
      HandlerSmsMass.send(req);
    }
    res.status(200).send({message:'Sending...'});
}
async function sendCtrl(req, res, next)
{
  let sMSSvailable = req.user.monthlySMS - req.user.sentSMS;
  if (sMSSvailable < 1) {
    res.status(400).send({
      message: 'Sorry!!! You do not have more SMS available for this month.'
    });
  }
  else{
    const data = await HandlerSmsMass.digestedData(req.body.message, req.body.contacts, req.user,req, res);
    if (data) {
      let userWthActiveOrder = req.app.get('userWthActiveOrder');
      if(!userWthActiveOrder[req.user._id]){
        let smsCountStack = req.app.get('smsCountStack');
        let dataStack = req.app.get('dataStack');
        for (let fact of data) {
          dataStack.push(fact);
        }
        userWthActiveOrder[req.user._id] = dataStack[dataStack.length - 1].countSms;
        smsCountStack = smsCountStack + dataStack[dataStack.length-1].countSms;
        req.app.set('dataStack', dataStack);
        req.app.set('userWthActiveOrder', userWthActiveOrder);
        req.app.set('smsCountStack', smsCountStack);
        const format     = 'hh:mm:ss';
        const time       = moment(Date.now(), format),
              beforeTime = moment('05:00:00', format),
              afterTime  = moment('21:00:00', format);
        if (!time.isBetween(beforeTime, afterTime)) {
          res.status(400).send({
            message: 'The service to send SMS start at 5:00 and end at 21:00 hour "GMT -4:30".'
          });
        } else {
          if (smsCountStack < 9600) {
            next();
          } else {
            res.status(503).send({
              message: 'Server to many busy, please wait calmly.'
            });
          }
        }
      }
      else{
        res.status(400).send({
          message: 'Already have a active order, please wait the previous order conclude.'
        });
      }
    }
  }
}

function sendNext (req, res) {
  let sendingStatus = req.app.get('sendingStatus');
  if (sendingStatus === 'end') {
    HandlerSmsMass.send(req);
  }else{
    let dataStack = req.app.get('dataStack');
    dataStack.splice(2,0,req.body.data);
    req.app.set('dataStack', dataStack);
  }
  res.status(200).send({
    message: 'Sending...'
  });
}

module.exports = {
  sendSms,
  saveSMS,
  sendCtrl,
  updateSMS,
  sendNext
};