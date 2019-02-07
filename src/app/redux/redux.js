import { createReducer, createAction } from 'redux-starter-kit'
import utf8 from 'utf8';

import fetchServer from '../shared/utils/fetchServer.js';
// Table of contacs

export const saveTable = createAction('table/savecontacts')

export const saveTableReducer = createReducer(
  [],
{
  [saveTable]: (state, action) => state = action.payload
})

// sendSMSserver

export const sendSMSserver = createAction('serverSend/sendSMS')
export const massSendSMSserver = createAction('serverSend/sendSMSmass')

export const sendSMSserverReducer = createReducer(
{},
{
  [sendSMSserver]: (state, action) => { 
    action.payload.then(res => {
      state = res
      return [state, res]

    })
  },
  [massSendSMSserver]: (state, action) => { 
    let objMessagePrepar = [],
        headClean = {},
        messageTempAlter = [],
        messageTemp = action.payload.message,
        totalOfContacs, flagToSendSms;
        messageTemp= String(messageTemp).replace(/(<|>)/gim, ',');
        messageTemp = messageTemp.split(',')
    for (var i = 0; i < action.payload.headTableContacts.length; i++) {
      let searchPoss = String(action.payload.headTableContacts[i].Header).replace(/(\"|\')/gmi, '')
      headClean[searchPoss.replace(/(\"|\'|\r)/gmi, '')] = searchPoss
    }
    for (var i = 0; i < action.payload.contacts.length-1; i++) {
      objMessagePrepar[i] = {}
      objMessagePrepar[i].phone = action.payload.contacts[i].phone
      messageTempAlter[i] = []
      for (var j = 0; j < messageTemp.length; j++) {
        messageTempAlter[i][j] = action.payload.contacts[i][String(headClean[messageTemp[j]]).replace(/(\"|\'|\r)/gmi, '')]||messageTemp[j]
        if (j===messageTemp.length-1) { objMessagePrepar[i].message = utf8.encode(messageTempAlter[i].join(''))}
      }
      console.log(objMessagePrepar[i])
      // objMessagePrepar[i] = JSON.parse(objMessagePrepar[i]);
    }
    totalOfContacs = objMessagePrepar.length;
    console.log(objMessagePrepar)
    // fetchServer.sendSms(objMessagePrepar[0])
    flagToSendSms = 1;
    let senderSms = setInterval( e=>
      {
        // fetchServer.sendSms(objMessagePrepar[flagToSendSms])
        flagToSendSms++
        if (flagToSendSms===totalOfContacs) { clearInterval(senderSms)}
      }, 3000)
  }
})
export default {
  saveTableReducer,
  sendSMSserverReducer
};