import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';
import './app/style/bootstrap-reboot.min.css';
import './app/style/bootstrap.min.css';
import './app/style/index.css';
import App from './app/App.jsx';
import store from './app/redux/store.js';
import * as serviceWorker from './app/serviceWorker';
import GuardRoute from './app/components/Wrapper/GuardRoute.jsx';

const Root = (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <GuardRoute type="tableUrl" path="/tableOfContacts" component={App} />
        <GuardRoute type="public" path="/" component={App} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(Root, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
