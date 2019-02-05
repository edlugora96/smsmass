const handlerSmsObj = require ('./handlerSmsObj.js')
function sendSms (req, res) 
{
  const handlerSmsMass = new handlerSmsObj (req.body.message, req.body.phone, req.body.long);
  if (req.body.long) 
  {
    handlerSmsMass.sendALongMessage()
    res.status(200).send("OK")
  }
  else
  {
    handlerSmsMass.send()
    handlerSmsMass.setData().then((response) => {
      res.status(200).send(response[3])
    }).catch( (response) => {
      res.status(409).send(response[1])
    })
  }
}

function readSms (req, res) {
  const handlerSmsMass = new handlerSmsObj (req.body.message, req.body.phone, req.body.long);
  var resp = handlerSmsMass.read();
  res.status(200).send(resp)
}
module.exports = {
  sendSms,
  readSms
}