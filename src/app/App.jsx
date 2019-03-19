/* jshint unused:false */
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '$redux/actions.js';
import store from '$redux/store.js';
import Footer from '$react/layout/Footer/Footer';
import Header from '$react/layout/Header/Header';
import Adside from '$react/layout/Adside/Adside';

import routes from '$utils/appRoutes';
import '$styles/App.styl';
import './socketsClient';

class App extends Component {
  render() {
    return pug`
      BrowserRouter
        React.Fragment
          header.headerLayout
            Header

          aside.sidenav(data-color="white", data-active-color="danger")
            Adside

          main.main-panel
            Switch
              for route, index in routes
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


