import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './app/App.jsx';
import store from '$redux/store.js';
import * as serviceWorker from './app/serviceWorker';
import '$extcss/normalize/normalize.css';
import '$extcss/semantic/semantic.css';
import '$styles/index.styl';
// import GuardRoute from './app/components/Wrapper/GuardRoute.jsx';

const Root = (
  <Provider store={store}>
    <App/>
  </Provider>
);

ReactDOM.render(Root, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
