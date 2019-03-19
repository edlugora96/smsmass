import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import * as actions from '$redux/actions.js';
import store from '$redux/store.js';

export const verifyCtrl = (Component) => {
  const VerifyCtrl = (props) =>{
    const [wantVerify, setWantVerify] = useState(false);
    const [wantSend, setWantSend] = useState(true);
    const [loading, setLoading] = useState(false);
    const verify = async ({step:init, confBtn, want, send, verifyText: verify}) => {
      !confBtn && setWantSend(!wantSend);
      setWantVerify(send);
      if(confBtn&&!init&&wantVerify&&verify==='') {
        return false;
      }
      setLoading(true);
      const res = send&& await props.verification({...props,init,verify});
      if (confBtn&&res.status===200) {
        setLoading(false);
        setWantVerify(false);
      } else if (res||!res){
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
        Component(verify=verify wantSend=wantSend wantVerify=wantVerify setWantSend=setWantSend, ...props)
      `;
    }
  };
  return VerifyCtrl;
};


const VerifyInput = (props) => {
  const {
    readOnly,
    verify,
    wantSend,
    wantVerify,
    setWantSend
  } = props;
  const inputCodeVerification = useRef(null);
  return pug`
    if (readOnly)
      input(type=props.type checked=props.isVerificate)

    else if (!props.isVerificate&&!readOnly)
      button(type="button" onClick=()=>{verify({send:wantSend,step:true, want:!wantVerify});setWantSend(!wantSend)})= wantVerify? 'Cancelar verificación' : 'Verificar'

    else if (props.isVerificate&&!readOnly)
      p Correcto

    if(wantVerify&&!props.isVerificate)
      button(type="button" onClick=()=>{verify({send:true,step:true, want:true})}) Renviar

      button(type="button" onClick=()=>{verify({verifyText:inputCodeVerification.current.value ,send:true, want:false,step:false, confBtn:true})}) Confirmar

      input(type="text" name="codeVerification" ref=inputCodeVerification placeholder="E-XXXXXXX")
  `;
};
const mapStateToProps = () => ({
  ...store.getState()
});
const mapDispatchToProps = {
  ...actions
};
export default React.memo(verifyCtrl(connect(mapStateToProps, mapDispatchToProps)(VerifyInput)));

