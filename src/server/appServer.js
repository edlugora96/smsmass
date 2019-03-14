const express    = require('express');
const bodyParser = require('body-parser');
const session    = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport   = require('passport');
const socketio   = require('socket.io');
const http       = require('http');
const morgan     = require('morgan');
const helmet     = require('helmet');
const cors       = require ( 'cors');
const smsApi     = require('./routes/sms.js');
const userApi    = require('./routes/user.js');
const HandlerSms = require('./services/atSMS.js');
const config = require('./services/globalConfig');
const app        = express();

const { passportIni } = require('./passport/localAuth');
const { passportJWTIni } = require('./passport/JWTAuth');
passportIni(passport);
passportJWTIni(passport);

const HandlerSmsClass = new HandlerSms(),
    crosOptions = {
      'origin'              : '*',
      'methods'             : 'GET,HEAD,PUT,PATCH,POST,DELETE',
      'preflightContinue'   : false,
      'optionsSuccessStatus': 204
    },
    optionsSession = {
      secret           : config.SECRET_TOKEN,
      resave           : true,
      saveUninitialized: true,
      store            : new MongoStore({
        url          : config.db,
        autoReconnect: true
      })
    };
HandlerSmsClass.setData()
.then(e=>{
  HandlerSmsClass.read(e);
});

const server = http.createServer(app);
const io = socketio.listen(server);

// API Dispatch
app.use(helmet());
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
app.use(morgan('dev'));
app.use(function(req, res, next) {res.header('Content-Type','application/json');next();});
app.use(cors(crosOptions));
app.use(session(optionsSession));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(function (req, res, next) {
//   /* req.session.COM8 = 'ready';
//   res.locals.session = req.session; */
//   console.log(req.session);
//   next();
// });

app.set('dataStack', []);
app.set('userWthActiveOrder', {});
app.set('seccionUsers', {});
app.set('smsCountStack', 0);
app.set('sendingStatus', 'end');

app.use('/sms', smsApi);
app.use('/users', userApi);

app.disable('x-powered-by');

app.get('/',(req, res)=>{
  req.session.visitas = req.session.visitas? req.session.visitas+1: 1;
  res.send(`Hola has visto esta pagina ${req.session.visitas} ${req.session.visitas===1?'vez':'veces'}`);
});

require('./sockets')(io,app);

module.exports = server;