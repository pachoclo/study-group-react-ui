import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import userReducer from './userReducer'
import loaderReducer from './loaderReducer'

// aggregates all reducers
export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  user: userReducer,
  loader: loaderReducer
})
