/* jshint unused:false */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '$redux/actions.js';
import FormikJson from '$utils/FormikJson';
import store from '$redux/store.js';
import template from './formLoginTemplate';

import './styles/login.styl';


class Login extends Component {

  render() {
    return pug`
      React.Fragment
        section.loggin
          h1 Iniciar seccion

          FormikJson(template=template["login"])
    `;
  }
}

const mapStateToProps = () => ({
  ...store.getState()
});
const mapDispatchToProps = {
  ...actions
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);