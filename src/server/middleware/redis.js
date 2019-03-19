const mongoose = require('mongoose');
const User     = require('../mongo/modelUser');
const shortid = require('shortid');

const redisStore = async (req, res, next) => {
  let secret;
  const lastKey = req.body.toEmail || req.body.phone;
  const cli = req.app.get('redis');
  if (req.body.init) {
    const generateSecret = () =>{
      secret = `E-${shortid.generate()}`;

      cli.set(req.user._id+req.body.toValidate+lastKey, secret, 'EX', 30*60);
      cli.set(req.user._id+req.body.toValidate+lastKey+'try', 1, 'EX', 30*60);
      req.body.message = secret;
    };
    const handlerResend = (err, value) => {
      if (value===null||value<=2) {
        generateSecret();
        value= (value*1) +1;
        cli.set(req.user._id+req.body.toValidate+lastKey+'try', value*1, 'EX', 30*60);
        next();
      } else {
        res.status(400).send({message:'Ya se ha enviadoun codigo de verificación, espre por favor.\n Es su defecto espere 30min a se que reinicie el sistema, para volver a intentarlo.'});
      }
    };
    const cliRes = (err, value)=>{
      cli.get(req.user._id+req.body.toValidate+lastKey+'try', handlerResend);
    };
    cli.get(req.user._id+req.body.toValidate+lastKey, cliRes);

  } else {
    cli.get(req.user._id+req.body.toValidate+lastKey, async (err, value)=>{
      const verify = req.body.verify;
      const toValidate = req.body.toValidate;
      const id = mongoose.Types.ObjectId(req.user._id);
      const query = toValidate === 'phone'? {_id:id, 'phone':{$elemMatch:{'numberPhone':req.body.phone}}}: {_id:id};
      const update = toValidate === 'phone'? {'$set':{'phone.$.verified':true} }: {verifiedUser:true};
      if (value === verify) {
        const queryRes = await User.findOneAndUpdate(
          query,
          update
        );
        if(queryRes){
          cli.del(req.user._id+req.body.toValidate+lastKey+'try');
          cli.del(req.user._id+req.body.toValidate+lastKey);
          res.status(200).send({messsage:'Verificacion exitosa'});
        }
      }else {
        res.status(500).send({messsage:'Error en la verificacion: Codigo invalido'});
      }
    });
  }
};

module.exports = {
  redisStore
};
/*
  cli.set('string key', 'string val');
  cli.hset('hash key', 'hashtest 1', 'some value');
  cli.hset(['hash key', 'hashtest 2', 'some other value']);
 */
