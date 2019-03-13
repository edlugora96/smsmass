/* jshint unused:false */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '$redux/actions.js';
import store from '$redux/store.js';

import './footer.styl';

class Footer extends Component {

  render() {
    return pug`
      nav.footer-nav
        ul
          li
            a(href="# ",) Creative Tim

          li
            a(href="# ",) Blog

          li
            a(href="# ", title="title") LICENSES

      .credits.ml-auto
        span.copyright
          | ©

          i.fa.fa-heart.heart
          | 2019 MTH by Eduardo Gonzalez
    `;
  }
}

const mapStateToProps = () => ({
  ...store.getState()
});
const mapDispatchToProps = {
  ...actions
};
export default connect(mapStateToProps, mapDispatchToProps)(Footer);