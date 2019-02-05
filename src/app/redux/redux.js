import { createReducer, createAction } from 'redux-starter-kit'

// Table of contacs

export const saveTable = createAction('table/savecontacts')

export const saveTableReducer = createReducer(
  window.localStorage.getItem('saveTable'),
{
  [saveTable]: (state, action) => state = action.payload
})

// sendSMSserver

export const sendSMSserver = createAction('serverSend/sendSMS')

export const sendSMSserverReducer = createReducer(
0,
{
  [sendSMSserver]: (state, action) => { 
    console.log(action.payload)
    state = 10 
    return [state]
  }
})

export default {
  saveTableReducer,
  sendSMSserverReducer
};