import { combineReducers } from 'redux'
import authReducer from './authReducer'

// aggregates all reducers
export default combineReducers({
  auth: authReducer
})
