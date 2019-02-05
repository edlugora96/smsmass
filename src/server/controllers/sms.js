const handlerSmsObj = require ('./handlerSmsObj.js')
function sendSms (req, res) 
{
  const handlerSmsMass = new handlerSmsObj (req.body.phone, req.body.long);
  if (Array.isArray(req.body.message)) 
  { 
    handlerSmsMass.send(req.body.message[0])
    handlerSmsMass.setData().then((response) => {
      res.status(200).send(response[3])
    }).catch( (response) => {
      res.status(409).send(response[1])
    })

    let i=1,
    dispatchSMS = setInterval(()=>{
      handlerSmsMass.send(req.body.message[i])
      handlerSmsMass.setData().then((response) => {
        res.status(200).send(response[3])
      }).catch( (response) => {
        res.status(409).send(response[1])
      })
      console.log(req.body.message[i], i, req.body.message.length-1)
      if (i===req.body.message.length-1) {clearInterval(dispatchSMS)}
      i++
    }, 60000)
    // res.status(200).send("OK")
  }
  else
  {
    handlerSmsMass.send(req.body.message)
    handlerSmsMass.setData().then((response) => {
      res.status(200).send(response[3])
    }).catch( (response) => {
      res.status(409).send(response[1])
    })
  }
}

function readSms (req, res) {
  const handlerSmsMass = new handlerSmsObj (req.body.phone, req.body.long);
  var resp = handlerSmsMass.read();
  res.status(200).send(resp)
}
module.exports = {
  sendSms,
  readSms
}