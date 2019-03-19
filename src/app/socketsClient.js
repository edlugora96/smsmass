// import store from '$redux/store.js';
import io from 'socket.io-client';
import store, { saveLogin } from '$redux/store';
import Auth from '$utils/auth';
// Helpres Fuction

// Socket Logic
const socket = io('http://localhost:8080');

if (localStorage.getItem('auth') && !store.getState().token) {
  Auth.verify()
    .then((auth)=>{
      if (auth) {
        saveLogin(localStorage.getItem('auth'));
        socket.emit('authUser', localStorage.getItem('auth'));
      } else {
        Auth.logout();
      }
    });
}
socket.on('logout', e => console.log(e, 'Estamos fuera'));

/* store.dispatch({
  type: 'sockets/savesocketio',
  payload: [socket]
}); */
export default socket;