/* jshint unused:false */
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '$redux/actions.js';
import store from '$redux/store.js';
import Footer from '$react/layout/Footer/Footer';
import Header from '$react/layout/Header/Header';
import Adside from '$react/layout/Adside/Adside';
import Home from '$react/Home/Home';
import User from '$react/User/User';
import Login from '$react/Login/Login';
import SMS from '$react/SMS/SMS';
import GuardWrap from '$utils/HoC/GuardWrap';
import '$styles/App.styl';
import './socketsClient';

class App extends Component {
  render() {
    const {
    loginToken
  } = this.props,
  isLogin = typeof loginToken === 'string';
    return pug`
      BrowserRouter
        React.Fragment
          header.headerLayout
            Header

          aside.sidenav(data-color="white", data-active-color="danger")
            Adside

          main.main-panel
            Switch
              Route(exact path="/" component=Home)

              GuardWrap(loginEnv=true isLogin=isLogin needRedirect=true Redirect=Redirect pathLogin="/user/4a4wda" pathLogout="/")
                Route(exact path="/app" component=SMS)

              GuardWrap(loginEnv=true isLogin=isLogin needRedirect=true Redirect=Redirect pathLogin="/user/4a4wda" pathLogout="/")
                Route(exact path="/user/:id" component=User)

              GuardWrap(loginEnv=false isLogin=isLogin needRedirect=true Redirect=Redirect pathLogin="/user/4a4wda" pathLogout="/")
                Route(exact path="/login" component=Login)

              GuardWrap(loginEnv=true isLogin=isLogin needRedirect=true Redirect=Redirect pathLogin="/user/4a4wda" pathLogout="/")
                Route(exact path="/logout" component=Home)

          footer.footer.footer-black.footer-white
            Footer
    `;
  }
}

const mapStateToProps = () => ({
  ...store.getState()
});
const mapDispatchToProps = {
  ...actions
};
export default connect(mapStateToProps, mapDispatchToProps)(App);