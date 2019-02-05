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
{},
{
  [sendSMSserver]: (state, action) => { 
    action.payload.then(res => {
      console.log(res)
      state = res
      return [state, res]

    })
    
  }
})

export default {
  saveTableReducer,
  sendSMSserverReducer
};