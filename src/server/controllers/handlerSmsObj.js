const SerialPort = require ( 'serialport' );
const utf8 = require('utf8');
const serialportgsm = require('serialport-gsm')
const modem = serialportgsm.Modem()
const pdu = require('./pdu')
let EventEmitter = require('events').EventEmitter
console.log(modem)
/*const portConst = new SerialPort("COM8", {
     baudRate: 9600,  
     dataBits: 8,  
     parity: 'none',  
     stopBits: 1, 
     flowControl: false, 
     xon : false, 
     rtscts:false, 
     xoff:false, 
     xany:false, 
     buffersize:0
});*/
class handlerSms 
{
  constructor(mg, ph) 
  {
    // this.port = portConst;
    this.phone = ph;
    this.message = mg;
    this.response;
  }
  read()
  {
    console.log('port communication open');
    this.port.write("AT+CMGF=?" );
    this.port.write('\r' );
    // this.port.write('AT+CMGR=3');
    this.port.on('data', (data)=>{
      console.log( "Received data: " + data )
      this.response = data;
      return this.response;
    } )  
  }

  send(alert)
  {
    let message = utf8.decode(String(this.message)),
        number = utf8.decode(String(this.phone))
    modem.makeId = function (numOfCharacters) {
      let text = ''
      let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      for (let i = 0; i < numOfCharacters; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length))
      return text
    }

    if (this.phone!= '' && this.message!= '') 
    {
      // try {
        let messageID = modem.makeId(25)
        let pduMessage = pdu.generate({
          text: message,
          receiver: number,
          encoding: '16bit',
          alert: alert || false
        })
        for (let i = 0; i < pduMessage.length; i++) {
          modem.executeCommand(`AT+CMGS=${number}`, function (data) { console.log(data) }, false, 100)
          modem.executeCommand(`${message}` + '\x1a', function (data) {
            console.log(data)
            let channel = ''
            if (data.status == 'fail') {
              channel = 'onMessageSendingFailed'
            } else {
              channel = 'onMessageSent'
            }

            let result = {
              status: data.status,
              request: data.request,
              data: {
                messageId: data.data.messageId,
                message: data.data.message,
                recipient: data.data.recipient,
                response: data.data.response
              }
            }
            if (i == pduMessage.length - 1) {
              modem.emit(channel, result)
              return (result)
            }
          }, false, 30000, messageID, message, number)
        }
        /*return ({
          status: 'success',
          request: 'sendSMS',
          data: {
            messageId: messageID,
            response: 'Successfully Sent to Message Queue'
          }
        })*/

      // } catch (error) {
      //   return ({
      //     status: 'Error',
      //     request: 'sendSMS',
      //     error: error
      //   })
      // }
      // modem.sendSMS(phone, message, true,e=>console.log(e))
      /*this.port.write("AT+CMGF=1" );
      this.port.write('\r' );
      this.port.write("AT+CSCA=+584260001100" );
      this.port.write('\r' );
      this.port.write("AT+CMGS=\"");
      this.port.write(phone);
      this.port.write('"')
      this.port.write('\r');
      this.port.write(message); 
      this.port.write(Buffer([0x1A]));
      this.port.write('^z');*/
    }
  }

  setData()
  {
    let options = {
        baudRate: 9600,
        dataBits: 8,
        parity: 'none',
        stopBits: 1,
        flowControl: false,
        xon: false,
        rtscts: false,
        xoff: false,
        xany: false,
        buffersize: 0
    }
    modem.open('COM8', options,(e,a)=>console.log(e,a))
    modem.on('open', data => {
        modem.initializeModem()
        modem.setModemMode(e=>console.log(e), 'PDU') 
    })
    /*var promiseGetData = new Promise( (resolve, reject) => { 
      
      this.port.on( 'data' , function(chunk) {
          var buffer = '';
          var answers = '';
          buffer += chunk;
          answers = buffer.split(/\r?\n/); 
          buffer = answers.pop();
          this.response = answers;
          answers[1] = new String(answers[1])
          console.log(answers)
          if (answers.length>2) {
            resolve(this.response)
          }
          else if (answers[1].search('ERROR')>-1) {
            reject(this.response)
          }
        })
    })
    return promiseGetData*/
  }
}

module.exports = handlerSms