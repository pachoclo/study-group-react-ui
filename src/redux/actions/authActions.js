import authClient from '../../Auth/Auth'
import { setAuthToken } from '../../util'
import { getErrors } from '../actions/errorActions'

export const LOGIN_REQUEST = '[auth] LOGIN_REQUEST'
export const LOGIN_RESPONSE = '[auth] LOGIN_RESPONSE'
export const LOGIN_SUCCESS = '[auth] LOGIN_SUCCESS'
export const LOGIN_ERROR = '[auth] LOGIN_ERROR'
export const LOGOUT = '[auth] LOGOUT_REQUEST'
export const LOGOUT_ERROR = '[auth] LOGOUT_ERROR'
export const RENEW_SESSION = '[auth] RENEW_SESSION'
export const RENEW_SESSION_ERROR = '[auth] RENEW_SESSION_ERROR'

export const loginRequest = () => ({
  type: LOGIN_REQUEST
})

export const loginSuccess = profile => ({
  type: LOGIN_SUCCESS,
  payload: profile
})

export const loginError = () => ({
  type: LOGIN_ERROR
})

export const logoutRequest = () => ({
  type: LOGOUT
})

export const logoutError = () => ({
  type: LOGOUT_ERROR
})

export const renewSessionError = () => ({
  type: RENEW_SESSION_ERROR
})

// thunks
export const loginResponse = () => dispatch => {
  dispatch({ type: LOGIN_RESPONSE })
  authClient
    .handleAuthentication()
    .then(() => {
      setAuthToken(authClient.getAccessToken())
      dispatch(loginSuccess(authClient.getProfile()))
    })
    .catch(err => {
      dispatch(loginError())
      dispatch(getErrors(err))
    })
}

export const renewSession = () => dispatch => {
  dispatch({ type: RENEW_SESSION })
  authClient
    .renewSession()
    .then(() => {
      setAuthToken(authClient.getAccessToken())
      const { nickname, name, email, picture } = authClient.getProfile()
      dispatch(
        loginSuccess({
          nickname,
          name,
          email,
          picture
        })
      )
    })
    .catch(err => {
      dispatch(renewSessionError())
      dispatch(getErrors(err))
    })
}
