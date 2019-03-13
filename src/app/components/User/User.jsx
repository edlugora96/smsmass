/* jshint unused:false */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '$redux/actions.js';
import store from '$redux/store.js';

import header from '$img/header.jpg';
import person from '$img/person.png';

import './styles/user.styl';


class User extends Component {

  render() {
    return pug`
      React.Fragment
        .from.ui.card
          .cardHeader.image
            img(src=header)

          .cardbody.content
            img(src=person).iu.avatar.image.cardbodyImg

            a.header Eduardo Gonzalez

            .description "I like the way you work it No diggity I wanna bag it up"

          .cardFooter.extra.content
            span sms 0/35

            span En cola 0

            span Orden activa 0

        .profile
    `;
  }
}

const mapStateToProps = () => ({
  ...store.getState()
});
const mapDispatchToProps = {
  ...actions
};
export default connect(mapStateToProps, mapDispatchToProps)(User);