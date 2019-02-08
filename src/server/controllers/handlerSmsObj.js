const SerialPort = require ( 'serialport' );
const Port = require('serial-at')
const portConst = new Port("COM8", {
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
})
// const portConst = new SerialPort();
class handlerSms 
{
  constructor(mg, ph) 
  {
    this.port = portConst;
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

  send()
  {
    if (this.phone!= '' && this.message!= '') 
    {
      this.port.at("AT+CMGF=1\rAT+CMGS=\""+this.phone+"\"\r"+this.message+Buffer([0x1A])+'^z').then(
        e=>console.log('Message sended'+e)
      )
      // this.port.write('' );
      // this.port.write("");
      // this.port.write();
      // this.port.write('"')
      // this.port.write('');
      // this.port.write(); 
      // this.port.write();
      // this.port.write();
    }
  }

  setData()
  {
    var promiseGetData = new Promise( (resolve, reject) => { 
      this.port.open().then(e=>console.log('Port are open sussces'+e))
    })
    return promiseGetData
  }
}

module.exports = handlerSms