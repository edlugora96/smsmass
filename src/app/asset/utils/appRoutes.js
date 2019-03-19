import React from 'react';
import { Redirect } from 'react-router-dom';
import Home from '$react/Home/Home';
import User from '$react/User/User';
import Login from '$react/Login/Login';
import Signup from '$react/Signup/Signup';
import SMS from '$react/SMS/SMS';
import guard from '$utils/HoC/GuardWrap';
import Auth from '$utils/auth';
const Logout = ()=>{
  Auth.logout();
  return pug`
    Redirect(to="/")
  `;
};
export default [
  {
      exact: true,
      name:'Inicio',
      path:'/',
      component:Home,
      loginEnv: 'any'
  },
  {
      exact: true,
      name:'Tutorial',
      path:'/',
      component:Home,
      loginEnv: 'any'
  },
  {
      exact: true,
      name:'Notificaciones',
      path:'/',
      component:Home,
      loginEnv: true
  },
  {
      exact: true,
      name:'App',
      path:'/app',
      component:guard(true)(SMS),
      loginEnv: true
  },
  {
      exact: true,
      name:'Perfil',
      path:'/user',
      component:guard(true)(User),
      loginEnv: true
  },
  {
      exact: true,
      name:'Iniciar sección',
      path:'/login',
      component:guard(false)(Login),
      loginEnv: false
  },
  {
      exact: true,
      name:'Registrarse',
      path:'/signup',
      component:guard(false)(Signup),
      loginEnv: false
  },
  {
      exact: true,
      name:'Salir',
      path:'/logout',
      component:guard(true)(Logout),
      loginEnv: true
  },
  {
      exact: true,
      name:'Apoyar',
      path:'/',
      component:Home,
      loginEnv: 'any'
  },
];