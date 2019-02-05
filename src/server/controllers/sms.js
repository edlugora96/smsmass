const handlerSmsObj = require ('./handlerSmsObj.js')
function sendSms (req, res) 
{
  // req.body = JSON.parse( req.body );
  const handlerSmsMass = new handlerSmsObj (req.body.message, req.body.phone, req.body.long);
    console.log(req.body)
    console.log(req.data)
    res.status(200).send("ok")
  // if (req.body.message.length<160) 
  // {
    /*handlerSmsMass.send()
    handlerSmsMass.setData().then((response) => {
      res.status(200).send(response[3])
    }).catch( (response) => {
      res.status(409).send(response[1])
    })*/
  // }
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