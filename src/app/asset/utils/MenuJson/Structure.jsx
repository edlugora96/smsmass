/* jshint unused:false */
import React from 'react';
import { Link } from 'react-router-dom'; // eslint-disable-line no-unused-vars
import GuardWrap from '$utils/HoC/GuardWrap'; // eslint-disable-line no-unused-vars
const Structure = (props) =>{
return pug`
  if (props.loginEnv!=='none')
    GuardWrap(loginEnv=props.loginEnv)
      Link(...props.attr to=props.href)= props.title

  else
    Link(...props.attr to=props.href)= props.title
`;
};
export default Structure;
