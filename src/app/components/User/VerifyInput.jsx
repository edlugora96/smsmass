import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import * as actions from '$redux/actions.js';
import store from '$redux/store.js';

export const verifyCtrl = (Component) => {
  const VerifyCtrl = (props) =>{
    const [wantVerify, setWantVerify] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errMessage, setErrMessage] = useState('');
    const verify = async ({step:init, confBtn, want, send, verifyText: verify}) => {
      const regExpValidate = props.toValidate==='email'? new RegExp("^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(\\.\\w{2,3})+$",'gim'): new RegExp("^(04|02)([\\d+]{9})$",'gim');
      const verifyTargget = props.toEmail?props.toEmail: props.phone;
      if (!regExpValidate.test(verifyTargget)) {
        const text = props.toValidate==='email'? 'correo' : 'nro. de teléfono'
        setErrMessage(`${verifyTargget}: El ${text} no es valido.`)
        return false;
      }
      setErrMessage('');
      setWantVerify(send);
      if(!init&&verify==='') {
        setErrMessage('Por favor escriba el codigo de validación que se le ha enviado.')
        return false;
      }
      setLoading(true);
      const res = send&& await props.verification({...props,init,verify});
      setErrMessage(res.message);
      if (confBtn&&res.status===200) {
        setLoading(false);
        setWantVerify(false);
      } else{
        setLoading(false);
      }
    };
    let loadMess='Cargando...';
    if (loading) {
      return pug`
        p= loadMess
      `;
    } else {
      return pug`
        Component(errMessage=errMessage verify=verify wantVerify=wantVerify, ...props)
      `;
    }
  };
  return VerifyCtrl;
};

const VerifyInput = (props) => {
  const {
    readOnly,
    verify,
    wantVerify,
    errMessage
  } = props;
  const inputCodeVerification = useRef(null);
  return pug`
    if (!wantVerify&&!props.isVerificate&&!readOnly)
      button(type="button" onClick=()=>{!wantVerify&&verify({send:true,step:true, want:true})})= 'Verificar'

    else if (props.isVerificate&&!readOnly)
      p Correcto

    else if(wantVerify&&!props.isVerificate)
      button(type="button" onClick=()=>{wantVerify&&verify({send:true,step:true})}) Renviar

      button(type="button" onClick=()=>{wantVerify&&verify({verifyText:inputCodeVerification.current.value ,send:true, step:false, confBtn:true})}) Confirmar

      input(type="text" name="codeVerification" ref=inputCodeVerification placeholder="E-XXXXXXX")

    p= errMessage
  `;
};
const mapStateToProps = () => ({
  ...store.getState()
});
const mapDispatchToProps = {
  ...actions
};
export default React.memo(verifyCtrl(connect(mapStateToProps, mapDispatchToProps)(VerifyInput)));

