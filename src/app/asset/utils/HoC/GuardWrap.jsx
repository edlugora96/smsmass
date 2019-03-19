import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Auth from '$utils/auth';

const guardWrap =  (loginEnv) =>{

  const guard = (Component) =>{

    const GuardComponent = (props) => {
      const [isAuth, setAuth] = useState(false);
      const [loadin, setLoadin] = useState(true);
      async function authQuery () {
        const authState = await Auth.verify();
        setAuth(authState);
        setLoadin(false);
        return authState;
      }
      useEffect(()=>{
        authQuery();
      });
      if (loadin) {
        return pug`
          h1 Cargando...
        `;
      } else if (isAuth && loginEnv && !loadin) {
        return pug`
          Component
        `;
      } else if (!isAuth && !loginEnv && !loadin) {
        return pug`
          Component
        `;
      } else {
        return pug`
          Redirect(to=isAuth?"/user":"/")
        `;
      }
    };

    return GuardComponent;
  };

  return guard;
};
export default guardWrap;