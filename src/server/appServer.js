const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const cors         = require ( 'cors');
const express      = require('express');
const helmet       = require('helmet');
const http         = require('http');
const morgan       = require('morgan');
const nodemailer   = require('nodemailer');
const redis        = require('redis');
const session      = require('express-session');
const RedisStore   = require('connect-redis')(session);
const socketio     = require('socket.io');
const smsApi       = require('./routes/sms.js');
const userApi      = require('./routes/user.js');
const config       = require('./services/globalConfig');

const app   = express();
const client= redis.createClient();
client.select(1);
client.flushdb();
const crosOptions = {
  'origin'              : '*',
  'methods'             : 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue'   : false,
  'optionsSuccessStatus': 204
};
const optionsSession = {
  secret           : config.SECRET_TOKEN,
  resave           : false,
  saveUninitialized: true,
  name: 'minor',
  cookie: {
      path: '/',
      maxAge:  1800000  //30 mins
  },
  store: new RedisStore({
      host:'127.0.0.1',
      port: 6379,
      db: 1,
      prefix:'elg',
      ttl: (7 * 60 * 60),
      client:client
  })
};

const {
  host,
  port,
  user,
  pass
} = config['sendgrid'];

let transporter = nodemailer.createTransport({
    host,
    port,
    secure: false,
    auth: {
      user,
      pass
    }
  });

// Configuration Socket Server
const server = http.createServer(app);
const io = socketio.listen(server);

// API Dispatch Middleware
  // Protection
app.use(helmet());
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
app.use(function(req, res, next) {res.header('Content-Type','application/json');next();});
  // Debug
app.use(morgan('dev'));
  // Session
app.use(cors(crosOptions));
app.use(cookieParser());
app.use(session(optionsSession));
  // Request parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./passport')(app);

// API Set accesable vars
app.set('dataStack', []);
app.set('userWthActiveOrder', {});
app.set('seccionUsers', {});
app.set('smsCountStack', 0);
app.set('sendingStatus', 'end');
app.set('mail', transporter);
app.set('redis', client);

// Set routes API
app.use('/sms', smsApi);
app.use('/users', userApi);
app.get('/',(req, res)=>{
  req.session.visitas = req.session.visitas? req.session.visitas+1: 1;
  res.send(`Hola has visto esta pagina ${req.session.visitas} ${req.session.visitas===1?'vez':'veces'}`);
});

app.disable('x-powered-by');

// Set Passport ans Socket.IO
require('./sockets')(io,app);

module.exports = server;