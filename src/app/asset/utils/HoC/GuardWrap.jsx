/* jshint unused:false */
/* import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '$redux/actions.js';
import store from '$redux/store.js';
import './styles/guardWrap.styl';
import { fetchGetServer } from '$utils/fetchServer';
const logout = async (props) => {
  let res = await fetchGetServer('users/logout');
  res.status === 200 && props.saveLogin(null);
  res.status === 200 && localStorage.removeItem('auth');
  res.status !== 200 && localStorage.removeItem('auth');
  res.status !== 200 && window.location.reload();
};

const GuardWrap = (props) => {
  const { RenderComponent } = props;
  if (props.loginEnv && typeof props.loginToken === 'string') {
    props.path === '/logout' && logout(props);
    if (props.path === '/logout') {
      return pug`
        Redirect(to="/")
      `;
    } else {
      return pug`
        RenderComponent(...props)
      `;
    }
  }
  else if (!props.loginEnv && typeof props.loginToken !== 'string') {
    if(props.path === '/logout') {
      return pug`
        Redirect(to="/")
      `;
    } else {
      return pug`
        RenderComponent(...props)
      `;
    }
  }
  else {
    let redirTo = typeof props.loginToken === 'string'?'/user/25454':'/';
    return pug`
      Redirect(to=redirTo)
    `;
  }

};
const mapStateToProps = () => ({
  ...store.getState()
});
const mapDispatchToProps = {
  ...actions
};
export default connect(mapStateToProps, mapDispatchToProps)(GuardWrap); */



// https://hacks.mozilla.org/2015/05/es6-in-depth-destructuring/
// V2
import React from 'react';
const GuardWrap = (props) => {
  const {
    Redirect,
    loginEnv,
    isLogin,
    children,
    needRedirect,
    pathLogin,
    pathLogout
  } = props;
  if (loginEnv==='any') {
    return children;
  }
  else if (!loginEnv && !isLogin) {
    return children;
  }
  else if (loginEnv && isLogin) {
    return children;
  }
  else if(needRedirect){
    return pug`
      Redirect(to=isLogin?pathLogin:pathLogout)
    `;
  }
  else {
    return false;
  }

  // if (loginEnv) {
  // }
  // else {
  //   return options.redirect;
  // };
};
export default GuardWrap;