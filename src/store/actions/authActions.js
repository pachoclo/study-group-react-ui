import authClient from '../../Auth/Auth'

export const LOGIN_REQUEST = '[auth] LOGIN_REQUEST'
export const LOGIN_RESPONSE = '[auth] LOGIN_RESPONSE'
export const LOGIN_SUCCESS = '[auth] LOGIN_SUCCESS'
export const LOGIN_ERROR = '[auth] LOGIN_ERROR'
export const RENEW_SESSION = '[auth] RENEW_SESSION'
export const LOGOUT = '[auth] LOGOUT_REQUEST'
export const LOGOUT_ERROR = '[auth] LOGOUT_ERROR'

export const loginRequest = () => ({
  type: LOGIN_REQUEST
})

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS
})

export const loginError = err => ({
  type: LOGIN_ERROR,
  payload: { error: err }
})

export const logoutRequest = () => ({
  type: LOGOUT
})

export const logoutError = err => ({
  type: LOGOUT_ERROR,
  payload: { error: err }
})

// thunks
export const loginResponse = () => dispatch => {
  dispatch({ type: LOGIN_RESPONSE })
  authClient
    .handleAuthentication()
    .then(() => dispatch(loginSuccess()))
    .catch(err => console.error)
}

export const renewSession = () => dispatch => {
  dispatch({ type: RENEW_SESSION })
  authClient
    .renewSession()
    .then(() => dispatch(loginSuccess()))
    .catch(err => console.error)
}
