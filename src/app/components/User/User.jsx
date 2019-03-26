/* jshint unused:false */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';

import * as actions from '$redux/actions.js';
import store from '$redux/store.js';
import FormikJson from '$utils/FormikJson';

import template from './formUserTemplate';

import header from '$img/header.jpg';
import person from '$img/person.png';

import './styles/user.styl';


const User = (props) => {
  const [readOnly, setReadOnly] = useState(true);
  const [verfySession, setVerfySession] = useState(false);
  const token = props.loginToken && props.loginToken.replace(/bearer /gmi, '');
  const user = props.loginToken && jwt.decode(token);
  const sms = props.loginToken && `SMS ${user.sendSMS}/${user.monthlySMS} |`;
  const order = props.loginToken && ` Orden activa ${user.activeOrder[0]} |`;
  console.log(verfySession);
  return pug`
    React.Fragment
      .from.ui.card
        .cardHeader.image
          img(src=header)

        .cardbody.content
          img(src=person).iu.avatar.image.cardbodyImg

          a.header= props.loginToken? user.name : 'Nada'

          .description= props.loginToken?user.description: 'Nada'

        .cardFooter.extra.content
          span= sms

          span  En cola 0 |

          span= order

      .from.ui.card.profile
        button(onClick=()=>setReadOnly(!readOnly))= readOnly? 'Editar' : 'Cancelar Edicion'

        FormikJson(formName="userUpdate" verfySession=verfySession setVerfySession=setVerfySession template=template(user), ...props, readOnly=readOnly, setReadOnly=setReadOnly)
  `;
};

const mapStateToProps = () => ({
  ...store.getState()
});
const mapDispatchToProps = {
  ...actions
};
export default connect(mapStateToProps, mapDispatchToProps)(User);