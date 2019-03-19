/* jshint unused:false */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'; // eslint-disable-line no-unused-vars

import * as actions from '$redux/actions.js';
import store from '$redux/store.js';
import sidebarMenu from '$utils/appRoutes';

import './styles/menujson.styl';

const MenuJson = (props) => {
  const isLogin = typeof props.loginToken === 'string';
  console.log(isLogin);
  return pug`
    React.Fragment
      each links, index in sidebarMenu
        if (links.loginEnv === 'any')
          Link(...links.attr, to=links.path key=links.path+"Menu"+index)= links.name

        else if (isLogin && links.loginEnv)
          Link(...links.attr, to=links.path key=links.path+"Menu"+index)= links.name

        else if (!isLogin && !links.loginEnv)
          Link(...links.attr, to=links.path key=links.path+"Menu"+index)= links.name
  `;
};

const mapStateToProps = () => ({
  ...store.getState()
});
const mapDispatchToProps = {
  ...actions
};
export default connect(mapStateToProps, mapDispatchToProps)(MenuJson);