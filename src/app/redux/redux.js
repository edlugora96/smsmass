import { createReducer, createAction } from 'redux-starter-kit'

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
      console.log(res)
      state = res
      return [state, res]

    })
  },
  [massSendSMSserver]: (state, action) => { 
    console.log(action)  
    let objMessagePrepar = [],
        messageTemp = action.payload.message
    for (var i = 0; i < action.payload.contacts.length; i++) {
      objMessagePrepar[i] = {}
      objMessagePrepar[i].phone = action.payload.contacts[i].phone
      for (var j = 0; j < action.payload.headTableContacts.length; j++) {
        let re = new RegExp( '[<'+String(action.payload.headTableContacts[j].Header)+'>]' ,'gi')
        messageTemp = String(messageTemp).replace(re, String(action.payload.contacts[i][action.payload.headTableContacts[j].Header])) 
        objMessagePrepar[i].message = messageTemp;
        console.log(re, action.payload.contacts[i][action.payload.headTableContacts[j].Header], messageTemp)
      }
    }
    console.log(objMessagePrepar)
  }
})
export default {
  saveTableReducer,
  sendSMSserverReducer
};