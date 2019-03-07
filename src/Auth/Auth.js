import history from '../history'
import auth0 from 'auth0-js'
import { AUTH_CONFIG } from './auth-config'

export default class Auth {
  accessToken
  idToken
  expiresAt

  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: 'studygroupmeetings.com',
    responseType: 'token id_token',
    scope: 'openid'
  })

  constructor() {
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.handleAuthentication = this.handleAuthentication.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
    this.getAccessToken = this.getAccessToken.bind(this)
    this.getIdToken = this.getIdToken.bind(this)
    this.renewSession = this.renewSession.bind(this)
  }

  login() {
    this.auth0.authorize()
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        console.log(JSON.stringify(authResult, null, 2))
        this.setClientSideCookie(authResult)
        history.replace('/')
      } else if (err) {
        history.replace('/')
        console.log(err)
        alert(`Error: ${err.error}. Check the console for further details.`)
      }
    })
  }

  getAccessToken() {
    return localStorage.getItem('accessToken')
  }

  getIdToken() {
    return localStorage.getItem('idToken')
  }

  setClientSideCookie(authResult) {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true')

    // Set the time that the access token will expire at
    let expiresAt = authResult.expiresIn * 1000 + new Date().getTime()
    localStorage.setItem('accessToken', authResult.accessToken)
    localStorage.setItem('idToken', authResult.idToken)
    localStorage.setItem('expiresAt', expiresAt)
  }

  renewSession() {
    this.auth0.checkSession({}, (err, authResult) => {
      console.log('[renewSession] checking session...')
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setClientSideCookie(authResult)
      } else if (err) {
        console.error('[renewSession] failed.', err)
        this.logout()
      }
    })
  }

  logout() {
    // Remove tokens and expiry time
    localStorage.removeItem('accessToken')
    localStorage.removeItem('idToken')
    localStorage.removeItem('expiresAt')

    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn')

    // navigate to the home route
    history.replace('/')
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = localStorage.getItem('expiresAt')
    return new Date().getTime() < expiresAt
  }
}
