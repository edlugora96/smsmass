const SerialPort = require ( 'serialport' );
let pdu = require('pdu');
const Port = require('serial-at');
/*const portConst = new Port("COM8", {
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
})*/
class handlerSms 
{
  constructor(mg, ph) 
  {
    // this.port = portConst;
    this.phone = ph;
    this.message = mg;
    this.response;
  }
  /*read()
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
  }*/

  send()
  {
    if (this.phone!= '' && this.message!= '') 
    {
      var promiseGetData = new Promise( (resolve, reject) => { 
        resolve('OK')
      })
      return promiseGetData
      /*let pduSMS = pdu.generate({
        text:this.message,
        receiver:this.phone, //MSISDN
        encoding:'16bit' 
      });
      return this.port.at("AT+CMGF=0\rAT+CMGS=00 41 "+pduSMS+'^z').then(
        e=>{
          if (String(e).indexOf('ERROR')!==-1) 
            {
              throw e
            } 
            else 
              { 
                return e 
              }
            }
      ).catch(
        e=> {throw new Error(e)}
      )*/
    }
  }

  setData()
  {
    var promiseGetData = new Promise( (resolve, reject) => { 
      // this.port.open().then(e=>console.log('Port are open sussces')).catch(e=>console.log('Error to try open the port '+e))
    })
    return promiseGetData
  }
}

module.exports = handlerSms