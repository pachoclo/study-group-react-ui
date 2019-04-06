import * as auth from '../actions/authActions'
import authClient from '../../Auth/Auth'

const initialState = {
  authenticated: false,
  pending: false,
  profile: {}
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case auth.LOGIN_REQUEST:
      authClient.login()
      return {
        authenticated: false,
        pending: true,
        profile: {}
      }

    case auth.RENEW_SESSION:
    case auth.LOGIN_RESPONSE:
      return {
        ...state,
        pending: true
      }

    case auth.LOGIN_SUCCESS:
      return {
        authenticated: true,
        pending: false,
        profile: action.payload
      }

    case auth.LOGIN_ERROR:
    case auth.RENEW_SESSION_ERROR:
    case auth.LOGOUT_ERROR:
      return {
        authenticated: false,
        pending: false,
        profile: {}
      }

    case auth.LOGOUT:
      authClient.logout()
      return {
        ...state,
        pending: true
      }

    default:
      return state
  }
}

export default authReducer
