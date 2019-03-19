import { createReducer } from 'redux-starter-kit';
import * as actions from './actions';

// Table of contacs
const dataTable = createReducer(
  {},
{
  [actions.saveTable]: (state, action) => state = action.payload
});

// Login
const loginToken = createReducer(
  localStorage.getItem('auth'),
{
  [actions.saveLogin]: (state, action) => state =action.payload
});

// Verfy Session
// const verfySession = createReducer(
//   false,
// {
//   [actions.setVerfySession]: (state, action) => state =action.payload
// });

  // verfySession,
export default {
  dataTable,
  loginToken
};