const handlerSmsObj = require ('./handlerSmsObj.js')
function sendSms (req, res)
{
    if (req.body.message.length<=160) {
      const handlerSmsMass = new handlerSmsObj (String(req.body.message).normalize('NFD').replace(/(\"|\'|\r)/gmi, ''), String(req.body.phone).replace(/(\"|\'|\r)/gmi, ''));
      let sendResponse = handlerSmsMass.send()
      sendResponse.then(
        e=>res.status(200).send(e)
      ).catch(
        e=>res.status(409).send(String(e))
      )
    }
    else {res.status(409).send('Max 160 charter')}
    /*else
    {
      let numberSMS = req.body.message.length/160;
      function recallSend(index) {
        let partMessage = req.body.message.substr(index*160,(index*160)+160*1)
        const handlerSmsMass = new handlerSmsObj (String(partMessage).normalize('NFD').replace(/(\"|\'|\r)/gmi, ''), String(req.body.phone).replace(/(\"|\'|\r)/gmi, ''));
        let sendResponse = handlerSmsMass.send()
        sendResponse.then(
          e=>
          {
            if (index<numberSMS) {
              console.log(e)
              recallSend(index+1)
              if (index===0) return res.status(200).send(e)
            }
          }
        ).catch(
          e=>
          {
            if (index<numberSMS) {
              console.log(e+' ERROR')
              recallSend(index+1)
              if (index===0) return res.status(409).send(String(e))
            }
          }
        )
      }
      recallSend(0)
    }*/
}

function readSms (req, res) {
  const handlerSmsMass = new handlerSmsObj (req.body.message, req.body.phone);
  var resp = handlerSmsMass.read();
  res.status(200).send(resp)
}
module.exports = {
  sendSms,
  readSms
}