const mongoose = require('mongoose');
const User = require('../mongo/modelUser');
const { saveSMS } = require('../controllers/sms');
const {
  updateUser,
  getUser
} = require('../controllers/user');
const Port      = require('serial-at');
const portConst = new Port('COM8', {
     baudRate   : 9600,
     dataBits   : 8,
     parity     : 'none',
     read_time  : 6000,
     stopBits   : 1,
     flowControl: false,
     xon        : false,
     rtscts     : false,
     xoff       : false,
     xany       : false,
     buffersize : 0
});
class handlerSms
{
  constructor()
  {
    this.port       = portConst;
    this.saveSMS    = saveSMS;
    this.updateUser = updateUser;
    this.getUser    = getUser;
    this.user       = User;
  }
  async digestedData(mwod, cwod, user, req, res) {
    if(mwod===undefined||cwod===undefined){
      throw new Error('The data to be sent can not be blank');
    }
    req.userQ = {};
    req.userQ.id = user._id;
    let userSearch = await this.getUser(req);
    let dataDigest         = [],
        messageTemp        = [],
        nrMessage          = 1,
        i                  = 0,
        restToSendSMS      = userSearch.monthlySMS - userSearch.sentSMS,
        messageWtOutDigest = String(mwod).replace(/(<|>)/gim, ',');
        messageWtOutDigest = messageWtOutDigest.split(',');
    if(restToSendSMS<1){
      res.status(400).send({
        message: 'Sorry!!! You do not have more SMS available for this month'
      });
    return false;
    }else{
      main: for (let contact of cwod) {
        dataDigest[i]         = {};
        dataDigest[i].phone   = contact.phone;
        dataDigest[i].userId  = user._id;
        dataDigest[i].sentSMS = user.sentSMS;
        messageTemp[i]         = [];
        let         j          = 0;
        for (let partMessage of messageWtOutDigest) {
          messageTemp[i][j] = contact[partMessage]||partMessage;
          if (j===messageWtOutDigest.length-1){
            dataDigest[i].message = [];
            messageTemp[i] = String(messageTemp[i].join(''));
            if(messageTemp[i].length>160){
              let nroMess = Math.ceil(messageTemp[i].length / 160);
              for (let index = 0; index < nroMess; index++) {
                dataDigest[i].message[index] = messageTemp[i].substring(index * 160, (index + 1) * 160);
                dataDigest[i].countSms = nrMessage;
                if (nrMessage===restToSendSMS) {
                  break main;
                }
                nrMessage++;
              }
            }
          }
          j++;
        }
        i++;
      }
      return dataDigest;
    }
  }
  async send(req)
  {
    let responses    = [],
        port         = this.port,
        self         = this;
    req.app.set('sendingStatus', 'sending');
    const sending      = new Promise((resolve)=>{
      async function sendingMessage(index, messIndex) {
        let       data               = req.app.get('dataStack'),
                  userWthActiveOrder = req.app.get('userWthActiveOrder');
        responses[index]             = {};
        if (messIndex === 0 && index !== 0) {
          data.shift();
          req.app.set('dataStack', data);
        }
        if (data[0])
        {
          let mess = Array.isArray(data[0].message) ? '' : data[0].message;
          if (Array.isArray(data[0].message)) {
            mess = data[0].message[messIndex];
          }
          //const smsResult = await port.at("AT+CMGF=1\rAT+CMGS=\""+data[0].phone+"\"\r"+mess+Buffer([0x1A])+"^z")
          const smsResult = await port.at('AT+CMGF=1');

          responses[index].result  = smsResult;
          responses[index].phone   = data[0].phone;
          responses[index].message = mess;
          responses[index].userId  = data[0].userId;

          req.body.sms         = {};
          req.body.sms.message = mess;
          req.body.sms.phone   = data[0].phone;
          req.body.result      = smsResult;
          req.body.userId      = data[0].userId;

          req.sms = await self.saveSMS(req);

          req.body         = {};
          req.userQ        = {};
          req.userQ.id     = data[0].userId;

          let userSearch       = await self.getUser(req);
              req.body.sentSMS = userSearch.sentSMS + 1;
          let id               = mongoose.Types.ObjectId(data[0].userId);
          await self.user.findByIdAndUpdate(id, req.body);

          if (userWthActiveOrder[data[0].userId]===0) {
            delete userWthActiveOrder[data[0].userId];
            req.app.set('userWthActiveOrder', userWthActiveOrder);
          }
          else if (userWthActiveOrder[data[0].userId]) {
            userWthActiveOrder[data[0].userId] = (userWthActiveOrder[data[0].userId]*1)-1;
            req.app.set('userWthActiveOrder', userWthActiveOrder);
          }
          if (Array.isArray(data[0].message)) {
            sendingMessage(index + 1, messIndex = messIndex === data[0].message.length-1 ? 0 : messIndex + 1);
          }
          else{
            sendingMessage(index+1, messIndex);
          }

        } else
        {
          req.app.set('smsCountStack', 0);
          req.app.set('userWthActiveOrder', {});
          req.app.set('sendingStatus', 'end');
          responses.status = 200;
          resolve(responses);
        }
      }
      return sendingMessage(0,0);
    });
    return sending;
  }
  read(){
    let self = this;
    // console.log(e)
    // const reader = new Readline({delimiter: '\r\n'});

    /*reader.on('data', chunk => {
        console.log(chunk)
    });

    this.port.port.pipe(reader);*/
    this.port.port.on('data',(e=>
      {
        // console.log(e.toString('utf8'));
      }));
    this.port.at('AT+CMGF=1');
      self.port.at('AT+CPMS= "SM"');
        // .then(e=>console.log(e));
    // this.port.at('AT+CMGR=0');
    // this.port.at("AT+CMGD=1,4");
    this.port.at('AT+CMGL="ALL"');
    // this.port.at('AT').then(e=>this.port.at('ATDP*55;\r'));
  }
  deleteSimMerssage(){
    this.port.at('AT+CMGD=1,4')
    .then(e=>console.log(e));
  }
  setData()
  {
    let promiseGetData = new Promise( (resolve, reject) => {
      this.port.open()
      .then(()=>{console.log('Port are open sussces');resolve();})
      .catch(e=>reject('Error to try open the port '+e));
    });
    return promiseGetData;
  }
}

module.exports = handlerSms;