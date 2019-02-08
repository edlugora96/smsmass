const handlerSmsObj = require ('./handlerSmsObj.js')
function sendSms (req, res) 
{
  const handlerSmsMass = new handlerSmsObj (String(req.body.message).replace(/(\"|\'|\r)/gmi, ''), String(req.body.phone).replace(/(\"|\'|\r)/gmi, ''));
    if (req.body.message.length<=160) {
      handlerSmsMass.send()
      /*handlerSmsMass.setData().then((response) => {
        res.status(200).send(response[3])
      }).catch( (response) => {
        res.status(409).send(response[1])
      })*/
      res.status(200).send('ok')
    }
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