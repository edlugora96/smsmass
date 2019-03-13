/* jshint unused:false */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '$redux/actions.js';
import store from '$redux/store.js';

import './styles/header.styl';

class Header extends Component {

  render() {
    return pug`
      React.Fragment
        .navbar-wrapper.brand
          .navbar-toggle
            button.navbar-toggler(type="button")
              span.navbar-toggler-bar.bar1

              span.navbar-toggler-bar.bar2

              span.navbar-toggler-bar.bar3

          a.navbar-brand(href="#pablo") SMS Mass

      button.navbar-toggler(type="button", data-toggle="collapse", data-target="#navigation", aria-controls="navigation-index", aria-expanded="false", aria-label="Toggle navigation")
        span.navbar-toggler-bar.navbar-kebab

        span.navbar-toggler-bar.navbar-kebab

        span.navbar-toggler-bar.navbar-kebab

      #navigation.collapse.navbar-collapse.justify-content-end
        ul.navbar-nav
          li.nav-item.view
            a.nav-link.btn-magnify(href="#pablo")
              i.nc-icon.nc-layout-11 w

              p
                span.d-lg-none.d-md-block Stats

          li.nav-item.btn-rotate.dropdown.alert
            a#navbarDropdownMenuLink.nav-link.dropdown-toggle(href="# ", data-toggle="dropdown", aria-haspopup="true", aria-expanded="false")
              i.nc-icon.nc-bell-55 x
              p
                span.d-lg-none.d-md-block Some Actions

            .dropdown-menu.dropdown-menu-right(aria-labelledby="navbarDropdownMenuLink")
              a.dropdown-item(href="#") Action

              a.dropdown-item(href="#") Another action

              a.dropdown-item(href="#") Something else here

          li.nav-item.config
            a.nav-link.btn-rotate(href="#pablo")
              i.nc-icon.nc-settings-gear-65 y
              p
                span.d-lg-none.d-md-block Account
    `;
  }
}

const mapStateToProps = () => ({
  ...store.getState()
});
const mapDispatchToProps = {
  ...actions
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);