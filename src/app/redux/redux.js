import { createReducer, createAction } from 'redux-starter-kit'

export const saveTable = createAction('table/savecontacts')

export const saveTableReducer = createReducer(
  window.localStorage.getItem('saveTable'),
{
  [saveTable]: (state, action) => state = action.payload
})

export default {
  saveTableReducer
};