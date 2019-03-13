import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_REQUEST } from '../actions/types'
import authClient from '../../Auth/Auth'

const initialState = {
  authenticated: false,
  fetching: false,
  profile: {}
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      console.log('logging in')
      authClient.login()
      return {
        ...state,
        authenticated: false,
        fetching: true,
        profile: {}
      }

    case LOGIN_SUCCESS:
      console.log('logging success')
      return {
        ...state,
        authenticated: true,
        fetching: false,
        profile: authClient.getProfile()
      }

    case LOGOUT_REQUEST:
      authClient.logout()
      return {
        ...state,
        authenticated: false,
        fetching: true
      }

    default:
      return state
  }
}

export default authReducer
