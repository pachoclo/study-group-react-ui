import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_REQUEST } from '../actions/types'
import authClient from '../../Auth/Auth'

export const loginRequest = () => ({
  type: LOGIN_REQUEST
})

export const loginResponseHandler = () => dispatch => {
  authClient
    .handleAuthentication()
    .then(() => dispatch(loginSuccess()))
    .catch(err => console.error)
}

export const renewSession = () => dispatch => {
  authClient
    .renewSession()
    .then(() => dispatch(loginSuccess()))
    .catch(err => console.error)
}

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS
})

export const logoutRequest = () => ({
  type: LOGOUT_REQUEST
})
