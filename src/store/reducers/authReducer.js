import * as auth from '../actions/authActions'
import authClient from '../../Auth/Auth'

const initialState = {
  authenticated: false,
  pending: false,
  profile: {},
  error: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case auth.LOGIN_REQUEST:
      authClient.login()
      return {
        authenticated: false,
        pending: true,
        profile: {},
        error: null
      }

    case auth.RENEW_SESSION:
    case auth.LOGIN_RESPONSE:
      return {
        ...state,
        pending: true,
        error: null
      }

    case auth.LOGIN_SUCCESS:
      return {
        authenticated: true,
        pending: false,
        profile: authClient.getProfile(),
        error: null
      }

    case auth.LOGIN_ERROR:
      authClient.logout()
      return {
        authenticated: false,
        pending: false,
        profile: {},
        error: action.payload.error
      }

    case auth.LOGOUT:
      authClient.logout()
      return {
        ...state,
        pending: true,
        error: null
      }

    case auth.LOGOUT_ERROR:
      return {
        pending: false,
        authenticated: false,
        profile: {},
        error: action.payload.error
      }

    default:
      return state
  }
}

export default authReducer
