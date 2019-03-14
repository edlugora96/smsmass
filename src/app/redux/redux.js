import { createReducer } from 'redux-starter-kit';
import * as actions from './actions';

// Table of contacs
const dataTable = createReducer(
  {},
{
  [actions.saveTable]: (state, action) => state = action.payload
});

// Socket IO
const socketClient = createReducer(
  {},
{
  [actions.saveSocket]: (state, action) => state = action.payload
});


// Login
const loginToken = createReducer(
  localStorage.getItem('auth'),
{
  [actions.saveLogin]: (state, action) => state =action.payload
});

export default {
  dataTable,
  socketClient,
  loginToken
};