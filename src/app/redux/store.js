import { configureStore } from 'redux-starter-kit'
import rootReducer from './redux.js'
import isomorphicFetch from 'isomorphic-fetch';
import promiseMiddleware from 'redux-promise-middleware';

const injectMiddleware = deps => ({ dispatch, getState }) => next => action => next(typeof action === 'function'
  ? action({ ...deps, dispatch, getState})
  : action
  );

const store = configureStore({
  reducer: rootReducer,
  middlware: [
    injectMiddleware({
      fetch: isomorphicFetch
    }),
    promiseMiddleware({
      promiseTypeSuffixes: ['START', 'SUCCESS', 'ERROR']
    })
  ]
})

export default store