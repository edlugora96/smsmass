// import store from '$redux/store.js';
import io from 'socket.io-client';
import store from '$redux/store';

// Helpres Fuction

// Socket Logic
const socket = io('http://localhost:8080');

if (localStorage.getItem('auth') && !store.getState().token) {
  socket.emit('authUser', localStorage.getItem('auth'));
}
socket.on('logout', e => console.log(e, 'Estamos fuera'));

/* store.dispatch({
  type: 'sockets/savesocketio',
  payload: [socket]
}); */
export default socket;