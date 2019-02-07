const SerialPort = require ( 'serialport' );
const portConst = new SerialPort("COM8", {
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
});
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
      this.port.write("AT+CMGF=1" );
      this.port.write('\r' );
      this.port.write("AT+CMGS=\"");
      this.port.write(this.phone);
      this.port.write('"')
      this.port.write('\r');
      this.port.write(this.message); 
      this.port.write(Buffer([0x1A]));
      this.port.write('^z');
    }
  }

  setData()
  {
    var promiseGetData = new Promise( (resolve, reject) => { 
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
    return promiseGetData
  }
}

module.exports = handlerSms