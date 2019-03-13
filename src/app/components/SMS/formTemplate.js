import { insertTextOnCursor } from '$utils/utils';
import * as Yup from 'yup';
const randomIndex = (min, max) => {
  return Math.ceil((Math.random() * max) + min);
};
const loadResultPreview = (e, textAreaTarget, props) => {
  const msjResult1 = e.target.offsetParent.querySelector('#msjResult');
  const randIndx = randomIndex(0, props.data.total - 1);
  let resultPreview1 = textAreaTarget.value;
  for (const header of props.data.headers) {
    const reg = new RegExp(`<%${header}%>`, 'gmi');
    resultPreview1 = resultPreview1.replace(reg, props.data.contacts[randIndx][header]);
  }
  msjResult1.innerText = randIndx+1+': '+resultPreview1;
};
const loadCounter = (textAreaTarget, counter, props) => {
  const nroMsj = Math.ceil(textAreaTarget.value.length*1.2 / 160);
  counter.innerText = `${nroMsj} ${nroMsj > 1 || nroMsj === 0 ? 'Mensajes X contacto' : 'Mensaje X contacto'} \nTotal: ${nroMsj * props.data.total}`;
};
export default {
  bodySMS: {
    components:[
      {
        type   : 'select',
        label  : 'none',
        options: 'vars',
        title  : 'Variables',
        attr   : {
          id       : 'varsMessage',
          className: 'form-control',
          name     : 'vars'
        },
        onChange: (e,props) => {
          const textAreaTarget = e.target.offsetParent.querySelector('#areaMessage');
          const val = `<%${e.currentTarget.value}%>`;
          const counter = e.target.offsetParent.querySelector('#msjCounter');
          if (e.currentTarget.value!=='') {
            insertTextOnCursor(textAreaTarget, val);
            loadResultPreview(e, textAreaTarget, props);
            loadCounter(textAreaTarget, counter, props);

          }
          e.currentTarget.value='';
        }
      },
      {
        type: 'textContainer',
        text: '0 Mensajes X contacto',
        attr: {
          id       : 'msjCounter',
          className: 'form-control',
        }
      },
      {
        type : 'textarea',
        title: 'Mensaje',
        attr : {
          id       : 'areaMessage',
          className: 'form-control',
          name     : 'message',
          autoFocus: true
        },
        onChange: (e,props) => {
          const counter = e.target.offsetParent.querySelector('#msjCounter');
          const textAreaTarget = e.currentTarget;
          loadResultPreview(e, textAreaTarget, props);
          loadCounter(textAreaTarget, counter, props);
        }
      },
      {
        type: 'textContainer',
        title: 'Vista previa',
        attr: {
          id: 'msjResult',
          className: 'form-control',
        }
      },
      {
        type            : 'cancelOrSubmit',
        titleSumit           : 'Enviar',
        titleCancel           : 'Cancelar',
        btnHandlerCancel: 'btnCancel',
        attrSubmit      : {
          id       : 'submitMessage',
          className: 'submitMessage'
        },
        attrCancle      : {
          id       : 'cancleMessage',
          className: 'cancleMessage'
        }
      }
    ],
    initianState: (props) => ({
      message: props.message ? props.message : '',
    }),
    validSchema: Yup.object().shape({
      message: Yup.string()
        .required('Required'),
    })
  }
};