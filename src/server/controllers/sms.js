const handlerSmsObj = require ('../services/atSMS.js')
function sendSms (req, res)
{
  const handlerSmsMass = new handlerSmsObj (req.body.message, req.body.contacts);
  handlerSmsMass.send()
  .then(e=>res.status(200).send(e))
  .catch(e=>console.log(e))
}

module.exports = {
  sendSms
}