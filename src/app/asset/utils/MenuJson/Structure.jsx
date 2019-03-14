/* jshint unused:false */
import React from 'react';
import { Link } from 'react-router-dom';
import GuardRoute from '$utils/HoC/GuardRoute';
const Structure = (props) => {
  const RenderComponent = () => pug`
    Link(...props.attr to=props.href)= props.title
  `;
  return pug`
    if (props.loginEnv!=='none')
      GuardRoute(loginEnv=props.loginEnv, RenderComponent=RenderComponent)

    else
      RenderComponent
  `;
};
export default Structure;
