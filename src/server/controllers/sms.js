const handlerSmsObj = require ('./handlerSmsObj.js')
function sendSms (req, res)
{
  const handlerSmsMass = new handlerSmsObj (String(req.body.message).replace(/(\"|\'|\r)/gmi, ''), String(req.body.phone).replace(/(\"|\'|\r)/gmi, ''));
    if (req.body.message.length<=160) {
      let sendResponse = handlerSmsMass.send()
      sendResponse.then(
        e=>res.status(200).send(e)
      ).catch(
        e=>res.status(409).send(String(e))
      )
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