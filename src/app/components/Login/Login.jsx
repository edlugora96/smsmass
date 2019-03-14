/* jshint unused:false */
import React from 'react';
import { connect } from 'react-redux';

import * as actions from '$redux/actions.js';
import FormikJson from '$utils/FormikJson';
import store from '$redux/store.js';
import template from './formLoginTemplate';

import './styles/login.styl';


const Login = (props) => pug`
  React.Fragment
    section.loggin
      h1 Iniciar seccion

      FormikJson(template=template["login"], ...props)
`;


const mapStateToProps = () => ({
  ...store.getState()
});
const mapDispatchToProps = {
  ...actions
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);