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
const routesMap = [
  {
      exact: true,
      path:'/',
      component:Home,
      loginEnv: 'any'
  },
  {
      exact: true,
      path:'/login',
      component:Login,
      loginEnv: false
  },
  {
      exact: true,
      path:'/app',
      component:SMS,
      loginEnv: true
  },
  {
      exact: true,
      path:'/user/:id',
      component:User,
      loginEnv: true
  },
  {
      exact: true,
      path:'/logout',
      component:Home,
      loginEnv: true
  }
];
class App extends Component {
  render() {
    const {
      loginToken
    } = this.props,
    isLogin = typeof loginToken === 'string';
    const guardDefault = {
      isLogin:isLogin,
      needRedirect:true,
      Redirect:Redirect,
      pathLogin:'/user/4a4wda',
      pathLogout:'/'
    };
    return pug`
      BrowserRouter
        React.Fragment
          header.headerLayout
            Header

          aside.sidenav(data-color="white", data-active-color="danger")
            Adside

          main.main-panel
            Switch
              for route, index in routesMap
                Route(...route key=route.path)

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

//- Route(exact path="/" component=Home)

//- GuardWrap(isLogin=isLogin loginEnv=isLogin needRedirect=true Redirect=Redirect pathLogin="/user/4a4wda" pathLogout="/")
//-   Route(exact path="/login" component=Login)

//- GuardWrap(isLogin=isLogin loginEnv=true needRedirect=true Redirect=Redirect pathLogin="/user/4a4wda" pathLogout="/")
//-   Route(exact path="/app" component=SMS)

//- GuardWrap(isLogin=isLogin loginEnv=true needRedirect=true Redirect=Redirect pathLogin="/user/4a4wda" pathLogout="/")
//-   Route(exact path="/user/:id" component=User)

//- GuardWrap(isLogin=isLogin loginEnv=true needRedirect=true Redirect=Redirect pathLogin="/user/4a4wda" pathLogout="/")
//-   Route(exact path="/logout" component=Home)


