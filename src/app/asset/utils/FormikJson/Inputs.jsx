import React from 'react';

export const areaInput = (props) => {
  const {
    readOnly
  }= props;
  const change = (e)=>{
    if(props.onChange){props.onChange(e,props);}
    props.field.onChange(e);
  };
  const blur = (e)=>{
    if(props.onBlur){props.onBlur(e,props);}
    props.field.onBlur(e);
  };
  return pug`
    textarea(readOnly=readOnly, ...props.attr, type=props.type, onFocus=props.onFocus, onBlur=blur, onChange=change)
  `;
};
export const selecttInput = (props) => {
  const {
    readOnly
  } = props;
  const change = (e) => {
    if (props.onChange) { props.onChange(e,props); }
    props.field.onChange(e);
  };
  const blur = (e) => {
    if (props.onBlur) { props.onBlur(e,props); }
    props.field.onBlur(e);
  };
  return pug`
    select(readOnly=readOnly,...props.attr, onFocus=props.onFocus, onBlur=blur, onChange=change).ui.fluid.dropdown
      option(value="" disabled)= props.title

      if (typeof props.options==="object")
        each opt, indx in props.options
          option(...opt.attr,key=props.attr.id+indx+"option"+opt.value ,value=opt.value)= opt.title

      else if (typeof props.options==="string")
        each opt, indx in props[props.options]
          if (typeof opt === "string")
            option(...opt.attr,key=props.attr.id+indx+"option"+opt ,value=opt)= opt

          else
            option(...opt.attr,key=props.attr.id+indx+"option"+opt.value ,value=opt.value)= opt.title
  `;
};
export const generalInput = (props) => {
  const {
    readOnly
  }= props;
  const valueCtrl = readOnly === true? props.initialValues[props.attr.name]:props.values[props.attr.name];
  const change = (e) => {
    if (props.onChange) { props.onChange(e,props); }
    props.handleChange(e);
    // props.field.value = e.target.value;
  };
  const blur = (e) => {
    if (props.onBlur) { props.onBlur(e,props); }
    props.handleBlur(e);
    // props.field.value = e.target.value;
  };
  return pug`
    //- input(readOnly=readOnly, ...props.attr, type=props.type, onFocus=props.onFocus, onBlur=blur, onChange=change defaultValue=props.initialValues[props.attr.name])
    input(readOnly=readOnly, ...props.attr, type=props.type, onFocus=props.onFocus, onBlur=blur, onChange=change value=valueCtrl)
  `;
};
