const jwt = require('jsonwebtoken');
const config = require('./services/globalConfig');
module.exports = (io,app) => {
  let users = {};
  io.on('connection', async socket=>{
    function addUser(token) {
            token        = token && token.replace(/bearer /gmi, '');
      const decoded      = token && jwt.decode(token, config.SECRET_TOKEN);
      const id           = token && decoded._id;
      let   seccionUsers = app.get('seccionUsers');
      console.log(users[id]);
      if (!users[id]) {
        socket.user = id;
        users[socket.user] = socket;
        app.set('usersIo', users);
        seccionUsers[id] = token;
        app.set('seccionUsers', seccionUsers);
      }
    }
    app.set('addUserIo', addUser);
    console.log('New user is connect');
    socket.on('authUser', addUser);
    socket.on('disconnect', () => {
      let seccionUsers = app.get('seccionUsers');
      console.log(Object.keys(seccionUsers).length, 'Delete');
      seccionUsers[socket.user] && delete seccionUsers[socket.user];
      app.set('seccionUsers', seccionUsers);
      socket.user && delete users[socket.user];
      socket.user && delete socket.user;
      console.log('Got disconnect!', Object.keys(users).length);
    });
  });
};