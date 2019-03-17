/* jshint unused:false */
import React from 'react';
import { connect } from 'react-redux';

import * as actions from '$redux/actions.js';
import store from '$redux/store.js';
import logo from '$img/avatar.jpg';
import MenuJson from '$utils/MenuJson';
import './styles/adside.styl';

const AdsideNav = (props) => {
  const {
    loginToken
  } = props,
  isLogin = typeof loginToken === 'string';
  return pug`
    React.Fragment
      .logo
        a.simple-text.logo-mini(href="https://www.edlugora.tk")
          .logo-image-small
            img(src=logo)

        a.simple-text.logo-normal(href="https://www.edlugora.tk")
          | EDLUGORA

      .sidebar-wrapper
        MenuJson(isLogin=isLogin, needRedirect=false)
  `;
};
const mapStateToProps = () => ({
  ...store.getState()
});
const mapDispatchToProps = {
  ...actions
};
export default connect(mapStateToProps, mapDispatchToProps)(AdsideNav);