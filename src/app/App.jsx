/* jshint unused:false */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '$redux/redux.js';
import store from '$redux/store.js';
import Footer from '$react/layout/Footer/Footer';
import Header from '$react/layout/Header/Header';
import Adside from '$react/layout/Adside/Adside';
import Home from '$react/User/User';

import '$styles/App.styl';

class App extends Component {

  render() {
    return pug`
      React.Fragment
        header.headerLayout
          Header

        aside.sidenav(data-color="white", data-active-color="danger")
          Adside

        main.main-panel
          Home

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