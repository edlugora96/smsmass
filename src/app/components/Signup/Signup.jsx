/* jshint unused:false */
import React, { useState } from 'react';
import { connect } from 'react-redux';

import * as actions from '$redux/actions.js';
import FormikJson from '$utils/FormikJson';
import store from '$redux/store.js';
import template from './formSignupTemplate';

import './styles/signup.styl';


const Signup = (props) => {
  const [step, setStep] = useState('sigupInit');
  const setCancel = () =>setStep('sigupInit');
  return pug`
    React.Fragment
      section.loggin
        h1 Registrarse
        FormikJson(name="signup" template=template[step], ...props, setStep=setStep, setCancel=setCancel)
  `;
};


const mapStateToProps = () => ({
  ...store.getState()
});
const mapDispatchToProps = {
  ...actions
};
export default connect(mapStateToProps, mapDispatchToProps)(Signup);