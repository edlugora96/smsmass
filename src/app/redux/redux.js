import { createReducer, createAction } from 'redux-starter-kit'


import fetchServer from '../shared/utils/fetchServer.js';

// Table of contacs

export const saveTable = createAction('table/savecontacts')

export const saveTableReducer = createReducer(
  [],
{
  [saveTable]: (state, action) => state = action.payload
})

// send

// sendSMSserver

export const massSendSMSserver = createAction('serverSend/sendSMSmass')

export const sendSMSserverReducer = createReducer(
{},
{
  [massSendSMSserver]: (state, action) => {
    let objMessagePrepar = [],
        headClean = {},
        messageTempAlter = [],
        messageTemp = action.payload.message,
        totalOfContacs, flagToSendSms;
        messageTemp= String(messageTemp).replace(/(<|>)/gim, ',');
        messageTemp = messageTemp.split(',')
    for (var i = 0; i < action.payload.headTableContacts.length; i++) {
      let searchPoss = String(action.payload.headTableContacts[i].dataField)
      headClean[searchPoss] = searchPoss
    }
    for (var i = 0; i < action.payload.contacts.length; i++) {
      objMessagePrepar[i] = {}
      objMessagePrepar[i].phone = action.payload.contacts[i].phone
      messageTempAlter[i] = []
      for (var j = 0; j < messageTemp.length; j++) {
        messageTempAlter[i][j] = action.payload.contacts[i][String(headClean[messageTemp[j]])]||messageTemp[j]
        if (j===messageTemp.length-1) { objMessagePrepar[i].message = String(messageTempAlter[i].join('')).replace('\n','')}
      }
    }
    totalOfContacs = objMessagePrepar.length;

    let index = 0
    function recallSend(index, arg, final){
        return fetchServer.sendSms(arg[index], 'server')
        .then
        (
          e=>{
            if (index<final-1) {
              recallSend(index+1, arg, final)
            }
            else
            {
              console.log('Fin')
              state = {body : 'finalized the shipments', promise: e};
              return state
            }
            index++
            return e
          }
        )
        .catch
        (
          e=>{
            if (index<final-1) {
              recallSend(index+1, arg, final)
            }
            else
            {
              console.log('Fin')
              state = {body : 'finalized the shipments', promise: e};
              return state
            }
            index++
            return e
          }
        )
    }
    recallSend(0,objMessagePrepar, totalOfContacs)
  }
})
export default {
  saveTableReducer,
  sendSMSserverReducer
};