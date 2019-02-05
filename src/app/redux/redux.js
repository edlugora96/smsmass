import { createReducer, createAction } from 'redux-starter-kit'

export const increment = createAction('counter/increment')
export const decrement = createAction('counter/decrement')

export const saveTable = createAction('table/savecontacts')

export const saveTableReducer = createReducer(
  window.localStorage.getItem('saveTable'),
{
  [saveTable]: (state, action) => state = action.payload
})

const counterReducer = createReducer(0, {
  [increment]: (state, action) => state + action.payload,
  [decrement]: (state, action) => state - action.payload
})

export default {
  saveTableReducer,
  counterReducer
};