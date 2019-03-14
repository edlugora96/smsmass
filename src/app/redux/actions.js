import { createAction  } from 'redux-starter-kit';

export const saveTable = createAction('table/savecontacts');
export const saveEmitter = createAction('event/saveemitter');
export const saveLogin = createAction('login/saveloginin');
export const saveSocket = createAction('sockets/savesocketio');

