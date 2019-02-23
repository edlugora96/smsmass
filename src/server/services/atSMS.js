const SerialPort = require ( 'serialport' );
const Readline = SerialPort.parsers.Readline;
// let pdu = require('pdu');
const Port = require('serial-at');
const portConst = new Port("COM8", {
     baudRate: 9600,
     dataBits: 8,
     parity: 'none',
     read_time:10000,
     stopBits: 1,
     flowControl: false,
     xon : false,
     rtscts:false,
     xoff:false,
     xany:false,
     buffersize:0
})
class handlerSms
{
  constructor(mg, cnt)
  {
    this.port = portConst;
    this.messageWtDigest = mg;
    this.contactsWtDigest = cnt;
    this.dataDigest = [];
    this.message;
    this.phone;
    this.response;
  }
  digestedData(){
    if(this.messageWtDigest===undefined||this.contactsWtDigest===undefined)
      return new Error('The data to be sent can not be blank')
    let dataDisgest = [],
        messageTemp = [],
        messageWtDigest = String(this.messageWtDigest).replace(/(<|>)/gim, ',');
    messageWtDigest = messageWtDigest.split(',')
    this.contactsWtDigest.forEach((contact,i)=>{
      dataDisgest[i] = {};
      dataDisgest[i].phone = contact.phone;
      messageTemp[i] = [];
      messageWtDigest.forEach((partMessage,j)=>{
        messageTemp[i][j] = contact[partMessage]||partMessage;
        if (j===messageWtDigest.length-1)
          dataDisgest[i].message = String(messageTemp[i].join(''));
      })
    })
    this.dataDigest = dataDisgest
    return this.dataDigest
  }
  send()
  {
    let data = this.digestedData(),
        stop = data.length-1,
        responses = [],
        port = this.port;
    let sending = new Promise((resolve, reject)=>{
      function sendingMessage(index, data, stop, messIndex) {
        let mess = data[index].message,
            increment = index+1,
            nroMess;
        responses[index]={}
        if (data[index].message.length>160) {
          nroMess = Math.ceil(data[index].message.length/160)
          mess = data[index].message.substring(messIndex*160, (messIndex+1)*160)
          increment = index;
          messIndex = messIndex+1;
          if (messIndex===nroMess){
            messIndex = 0
            increment = increment+1
          }
        }
        port.at("AT+CMGF=1\rAT+CMGS=\""+data[index].phone+"\"\r"+mess+Buffer([0x1A])+"^z")
        .then(e=>{
          responses[index].response = e
          responses[index].message = nroMess>1?[]:mess
          if(nroMess>1)
            responses[index].message[messIndex] = mess
          responses[index].phone = data[index].phone
          console.log(responses[index], e)
          if (index<stop)
            sendingMessage(increment,data,stop, messIndex)
          else
            resolve(responses)
        })
        .catch(e=>{
          console.log(e)
          responses[index].error = e
          err.push(e)
          if (index<stop)
            sendingMessage(increment,data,stop, messIndex)
          else
            resolve(responses)
        })
      }
      return sendingMessage(0,data,stop,0)
    })
    return sending
  }
  read(e){
    let self = this;
    // console.log(e)
    const reader = new Readline({delimiter: '\r\n'});

    /*reader.on('data', chunk => {
        console.log(chunk)
    });

    this.port.port.pipe(reader);*/
    this.port.port.on('data',(e=>
      {
        console.log(e.toString('utf8'))
      }))
    this.port.at('AT+CMGF=1')
      self.port.at('AT+CPMS= "SM"')
        // .then(e=>console.log(e))
    // this.port.at('AT+CMGR=0')
    // this.port.at("AT+CMGD=1,4")
    this.port.at('AT+CMGL="ALL"')
    // this.port.at('AT').then(e=>this.port.at('ATDP*55;\r'))
  }
  deleteSimMerssage(){
    this.port.at("AT+CMGD=1,4")
    .then(e=>console.log(e))
  }
  setData()
  {
    let promiseGetData = new Promise( (resolve, reject) => {
      this.port.open()
      .then(e=>{console.log('Port are open sussces');resolve()})
      .catch(e=>reject('Error to try open the port '+e))
    })
    return promiseGetData
  }
}

module.exports = handlerSms