import { createReducer, createAction } from 'redux-starter-kit'

// Table of Contacts

export const saveTable = createAction('table/savecontacts')

export const saveTableReducer = createReducer(
  window.localStorage.getItem('saveTable'),
{
  [saveTable]: (state, action) => state = action.payload
})

// fetchServer sendSMS

export const sndSMSserver = createAction('fetchServer/sendSMS')

export const sndSMSserverReducer = createReducer({},
{
  [sndSMSserver]: (state, action) => state = action.payload
})

export default {
  saveTableReducer,
  sndSMSserverReducer
};