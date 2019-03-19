import { configureStore } from 'redux-starter-kit';
import rootReducer from './redux.js';

const store = configureStore({
  reducer: rootReducer
});

export const saveLogin = (token) => {
  store.dispatch({
    type:'login/saveloginin',
    payload:token
  });
};
export const setVerfySession = (payload) => {
  store.dispatch({
    type:'verify/setverifysession',
    payload
  });
};

export default store;