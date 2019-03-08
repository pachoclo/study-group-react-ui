import auth0 from 'auth0-js'
import { AUTH_CONFIG } from './auth-config'
import { Promise } from 'q'

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

  login = () => {
    this.auth0.authorize()
  }

  handleAuthentication = () => {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setClientSideCookie(authResult)
          resolve(true)
        } else if (err) {
          console.log(err)
          alert(`Error: ${err.error}. Check the console for further details.`)
          reject(false)
        }
      })
    })
  }

  getAccessToken = () => {
    return localStorage.getItem('accessToken')
  }

  getIdToken = () => {
    return localStorage.getItem('idToken')
  }

  setClientSideCookie = authResult => {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true')

    // Set the time that the access token will expire at
    let expiresAt = authResult.expiresIn * 1000 + new Date().getTime()
    localStorage.setItem('accessToken', authResult.accessToken)
    localStorage.setItem('idToken', authResult.idToken)
    localStorage.setItem('expiresAt', expiresAt)
  }

  renewSession = () => {
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

  logout = () => {
    // Remove tokens and expiry time
    localStorage.removeItem('accessToken')
    localStorage.removeItem('idToken')
    localStorage.removeItem('expiresAt')

    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn')
  }

  isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = localStorage.getItem('expiresAt')
    return new Date().getTime() < expiresAt
  }
}
