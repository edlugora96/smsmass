import React from 'react';
import { areaInput, selecttInput, generalInput } from './Inputs.jsx';

const Structure = (props) => {
  const {
    FormShapes,
    FormShape,
    readOnly,
    Component
  }= props,
  MerFormShapes = {
    ...FormShapes,
    ...FormShape
  };
  if (props.type === 'select') {
    if(Component) {
      return pug`
        Component(...props)
      `;
    } else {
      return pug`
        MerFormShapes.Parent(key=props.index+props.title,...props)
          if (props.label !== 'none')
            MerFormShapes.Label(...props)

          MerFormShapes.Input(component=selecttInput, ...props)

          if(!readOnly)
            MerFormShapes.ErrorMessage(...props)
    `;
    }
  }
  else if (props.type === 'textContainer') {
    if(Component) {
      return pug`
        Component(...props)
      `;
    } else {
      return pug`
        MerFormShapes.Parent(key=props.index+props.title,...props)
          if (props.title)
            label= props.title

          p(...props.attr)= props.text
      `;
    }
  }
  else if (props.type === 'textarea') {
    if(Component) {
      return pug`
        Component(...props)
      `;
    } else {
      return pug`
        MerFormShapes.Parent(key=props.index+props.title,...props)
          if (props.label !== 'none')
            MerFormShapes.Label(...props)

          MerFormShapes.Input(component=areaInput, ...props)

          if(!readOnly)
            MerFormShapes.ErrorMessage(...props)
      `;
    }
  }
  else if (props.type === 'cancelOrSubmit') {
    if(Component) {
      return pug`
        Component(...props)
      `;
    } else {
      // const btnHandlerCancel = typeof props.btnHandlerCancel === "string"? props[props.btnHandlerCancel] : props.btnHandlerCancel;
      // const btnHandlerSubmits = typeof props.btnHandlerSubmits === "string"? props[props.btnHandlerSubmits] : props.btnHandlerSubmits;
      return pug`
        MerFormShapes.Parent(key=props.index+props.title, ...props)
          button(...props.attrCancle, onClick=props[props.btnHandlerCancel], type="reset").ui.button= props.titleCancel?props.titleCancel:'Cancelar'

          .or(data-text="o")

          button(...props.attrSubmit, onClick=()=>props[props.btnHandlerSubmits], type="submit").ui.positive.button= props.titleSumit?props.titleSumit:'Enviar'
      `;
    }
  }
  else if (props.type === 'submit') {
    if(Component) {
      return pug`
        Component(...props)
      `;
    } else {
      const btnHandlerSubmits = typeof props.btnHandlerSubmits === "string"? props[props.btnHandlerSubmits] : props.btnHandlerSubmits;
      return pug`
        MerFormShapes.Parent(key=props.index+props.title, ...props)
          button(...props.attrSubmit, onClick=btnHandlerSubmits, type="submit").ui.positive.button= props.titleSumit?props.titleSumit:'Enviar'
      `;
    }
  }
  else {
    if(Component) {
      return pug`
        Component(...props)
      `;
    } else {
      return pug`
        MerFormShapes.Parent(key=props.index+props.title, ...props)
          if (props.label !== 'none')
            MerFormShapes.Label(...props)

          MerFormShapes.Input(component=generalInput, ...props)

          if(!readOnly)
            MerFormShapes.ErrorMessage(...props)
      `;
    }
  }
};
export default Structure;
