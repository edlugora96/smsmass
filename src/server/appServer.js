const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const cors         = require ('cors');
const express      = require('express');
const helmet       = require('helmet');
const http         = require('http');
const morgan       = require('morgan');
const nodemailer   = require('nodemailer');
// const redis        = require('redis');
const session      = require('express-session');
// const RedisStore   = require('connect-redis')(session);
const socketio     = require('socket.io');
const smsApi       = require('./routes/sms.js');
const userApi      = require('./routes/user.js');
const config       = require('./services/globalConfig');
const dbAuth        = require('./mongo/db-connection');

const app   = express();
// const client= redis.createClient();
// client.select(1);
// client.flushdb();
const crosOptions = {
  'origin'              : '*',
  'methods'             : 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue'   : false,
  'optionsSuccessStatus': 204
};
const optionsSession = {
  secret           : config.SECRET_TOKEN,
  key: 'express.sid',
  resave: true,
  saveUninitialized: false
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

// Set Passport
require('./passport')(app);

// API Set accesable vars
app.set('dataStack', []);
app.set('userWthActiveOrder', {});
app.set('gSession', {});
app.set('seccionUsers', {});
app.set('smsCountStack', 0);
app.set('sendingStatus', 'end');
app.set('mail', transporter);
// app.set('redis', client);
app.set('userManager', dbAuth({user:'USERS_MANAGER',pass:config.USERS_MANAGER_PASS,poolSize:10}));
app.set('userCredsManager', dbAuth({user:'USERS_CREDS_MANAGER',pass:config.USERS_CREDS_MANAGER_PASS,poolSize:10}));

// Set routes API
app.use('/sms', smsApi);
app.use('/users', userApi);
app.get('/',(req, res)=>{
  req.session.visitas = req.session.visitas? req.session.visitas+1: 1;
  res.send(`Hola has visto esta pagina ${req.session.visitas} ${req.session.visitas===1?'vez':'veces'}`);
});

app.disable('x-powered-by');

// Set Socket.IO
require('./sockets')(io,app);

module.exports = server;