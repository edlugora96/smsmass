import { configureStore } from 'redux-starter-kit'
import rootReducer from './redux.js'

const store = configureStore({
  reducer: rootReducer
})

export default store