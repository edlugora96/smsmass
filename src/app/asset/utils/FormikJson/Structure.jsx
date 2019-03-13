/* jshint unused:false */
import React from 'react';
import { FastField, ErrorMessage } from 'formik';
const areaInput = (props) => {
  const change = (e)=>{
    if(props.onChange){props.onChange(e,props);}
    props.field.onChange(e);
  };
  const blur = (e)=>{
    if(props.onBlur){props.onBlur(e,props);}
    props.field.onBlur(e);
  };
  return pug`
    textarea(...props.attr, type=props.type, onFocus=props.onFocus, onBlur=blur, onChange=change)
  `;
};

const selecttInput = (props) => {
  const change = (e) => {
    if (props.onChange) { props.onChange(e,props); }
    props.field.onChange(e);
  };
  const blur = (e) => {
    if (props.onBlur) { props.onBlur(e,props); }
    props.field.onBlur(e);
  };
  return pug`
    select(...props.attr, onFocus=props.onFocus, onBlur=blur, onChange=change).ui.fluid.dropdown
      option(value="")= props.title

      if (typeof props.options==="array")
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

const generalInput = (props) => {
  const change = (e) => {
    if (props.onChange) { props.onChange(e,props); }
    props.field.onChange(e);
  };
  const blur = (e) => {
    if (props.onBlur) { props.onBlur(e,props); }
    props.field.onBlur(e);
  };
  return pug`
    input(...props.attr, type=props.type, onFocus=props.onFocus, onBlur=blur, onChange=change)
  `;
};
const Structure = (props) => {
  if (props.type === 'select') {
    return pug`
      .field(key=props.index+props.title)
        if (props.label !== 'none')
          label(htmlFor=props.attr.id)= props.title

        FastField(component=selecttInput, ...props)

        ErrorMessage(...props.attr)
  `;
  }
  else if (props.type === 'textContainer') {
    return pug`
      .field(key=props.index+props.title)
        if (props.title)
          label= props.title

        p(...props.attr)= props.text
  `;
  }
  else if (props.type === 'textarea') {
    return pug`
      .field(key=props.index+props.title)
        if (props.label !== 'none')
          label(htmlFor=props.attr.id)= props.title

        FastField(component=areaInput, ...props)

        ErrorMessage(...props.attr)
  `;
  }
  else if (props.type === 'cancelOrSubmit') {
    return pug`
      .ui.buttons(key=props.index+props.title)
        if (typeof props.btnHandlerCancel === "string")
          button(...props.attrCancle, onClick=props[props.btnHandlerCancel], type="reset").ui.button= props.titleCancel

        else
          button(...props.attrCancle, onClick=props.btnHandlerCancel, type="reset").ui.button= props.titleCancel?props.titleCancel:'Cancelar'

        .or(data-text="o")

        if (typeof props.btnHandlerCancel === "string")
          button(...props.attrSubmit, onClick=props[props.btnHandlerSubmits] type=props.type).ui.positive.button= props.titleSumit

        else
          button(...props.attrSubmit, onClick=props.btnHandlerSubmit type=props.type).ui.positive.button= props.titleSumit?props.titleSumit:'Enviar'
  `;
  }
  else {
    return pug`
      .field(key=props.index+props.title)
        if (props.label !== 'none')
          label(htmlFor=props.attr.id)= props.title

        FastField(...props, component=generalInput)

        ErrorMessage(...props.attr)
    `;
  }
};
export default Structure;
