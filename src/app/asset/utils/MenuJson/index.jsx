/* jshint unused:false */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'; // eslint-disable-line no-unused-vars

import * as actions from '$redux/actions.js';
import store from '$redux/store.js';
import './styles/menujson.styl';
import GuardWrap from '$utils/HoC/GuardWrap'; // eslint-disable-line no-unused-vars

const sidebarMenu = [
  {
    active: true,
    loginEnv: 'any',
    title: 'Inicio',
    href: '/',
    attr:{
      className: 'nc-icon nc-bank'
    }
  },
  {
    active: false,
    loginEnv: true,
    title: 'App',
    href: '/app',
    attr:{
      className: 'nc-icon nc-diamond'
    }
  },
  {
    active: false,
    loginEnv: false,
    title: 'Tutorial',
    href: '/',
    attr:{
      className: 'nc-icon nc-pin-3'
    }
  },
  {
    active: false,
    loginEnv: true,
    title: 'Notifications',
    href: '/',
    attr:{
      className: 'nc-icon nc-bell-55'
    }
  },
  {
    active: false,
    loginEnv: true,
    title: 'Perfil',
    href: '/user/654aw',
    attr:{
      className: 'nc-icon nc-single-02'
    }
  },
  {
    active: false,
    loginEnv: false,
    title: 'Iniciar sección',
    href: '/login',
    attr:{
      className: 'nc-icon nc-single-02'
    }
  },
  {
    active: false,
    loginEnv: true,
    title: 'Salir',
    href: '/logout',
    attr:{
      className: 'nc-icon nc-single-02'
    }
  },
  {
    active: false,
    loginEnv: 'any',
    title: 'Apoyar',
    href: '/',
    attr:{
      className: 'nc-icon nc-single-02'
    }
  }
];

const MenuJson = (props) => pug`
  React.Fragment
    each links, index in sidebarMenu
      GuardWrap(...props, key=index+"link"+links.title loginEnv=links.loginEnv)
        Link(...links.attr, to=links.href)= links.title
`;

const mapStateToProps = () => ({
  ...store.getState()
});
const mapDispatchToProps = {
  ...actions
};
export default connect(mapStateToProps, mapDispatchToProps)(MenuJson);