/* jshint unused:false */
import React from 'react';
import { connect } from 'react-redux';

import * as actions from '$redux/actions.js';
import store from '$redux/store.js';
import './styles/menujson.styl';
import Structure from './Structure';
const sidebarMenu = [
  {
    active: true,
    loginEnv: 'none',
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
    loginEnv: 'none',
    title: 'Apoyar',
    href: '/',
    attr:{
      className: 'nc-icon nc-single-02'
    }
  }
];

const MenuJson = () => pug`
  React.Fragment
    each links, index in sidebarMenu
      Structure(...links, key=index+"Links"+links.title)
`;

const mapStateToProps = () => ({
  ...store.getState()
});
const mapDispatchToProps = {
  ...actions
};
export default connect(mapStateToProps, mapDispatchToProps)(MenuJson);