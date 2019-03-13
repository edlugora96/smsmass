/* jshint unused:false */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '$redux/actions.js';
import store from '$redux/store.js';
import logo from '$img/avatar.jpg';
import './styles/adside.styl';

const sidebarMenu = [
  {
    active: true,
    href: '# ',
    iClass: 'nc-icon nc-bank',
    body: 'Inicio'
  },
  {
    active: false,
    href: '# ',
    iClass: 'nc-icon nc-diamond',
    body: 'App'
  },
  {
    active: false,
    href: '# ',
    iClass: 'nc-icon nc-pin-3',
    body: 'Tutorial'
  },
  {
    active: false,
    href: '# ',
    iClass: 'nc-icon nc-bell-55',
    body: 'Notifications'
  },
  {
    active: false,
    href: '# ',
    iClass: 'nc-icon nc-single-02',
    body: 'Perfil'
  },
  {
    active: false,
    href: '# ',
    iClass: 'nc-icon nc-single-02',
    body: 'Iniciar sección'
  },
  {
    active: false,
    href: '# ',
    iClass: 'nc-icon nc-single-02',
    body: 'Apoyar'
  }
];

class AdsideNav extends Component {

  render() {
    return pug`
      React.Fragment
        .logo
          a.simple-text.logo-mini(href="https://www.edlugora.tk")
            .logo-image-small
              img(src=logo)

          a.simple-text.logo-normal(href="https://www.edlugora.tk")
            | EDLUGORA

        .sidebar-wrapper
          each item, index in sidebarMenu
            ul(key=item.body+index).nav
              li(className=item.active?"active":"")
                a(href=item.href)
                  i(className=item.iClass)

                  p= item.body
    `;
  }
}

const mapStateToProps = () => ({
  ...store.getState()
});
const mapDispatchToProps = {
  ...actions
};
export default connect(mapStateToProps, mapDispatchToProps)(AdsideNav);