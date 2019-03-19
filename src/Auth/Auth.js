import auth0 from 'auth0-js'
import { AUTH_CONFIG } from './auth-config'

class Auth {
  accessToken
  idToken
  expiresAt
  profile

  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: AUTH_CONFIG.audience,
    responseType: AUTH_CONFIG.responseType,
    scope: AUTH_CONFIG.scope
  })

  login = () => this.auth0.authorize()

  logout = () => {
    localStorage.removeItem('isLoggedIn')
    this.auth0.logout({ returnTo: AUTH_CONFIG.loginReturnToUrl })
  }

  handleAuthentication = () => {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult)
          resolve()
        } else if (err) {
          console.log(err)
          reject()
        }
      })
    })
  }

  setSession = authResult => {
    this.accessToken = authResult.accessToken
    this.idToken = authResult.idToken
    this.profile = authResult.idTokenPayload
    this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime()
    localStorage.setItem('isLoggedIn', 'true')
  }

  renewSession = () => {
    return new Promise((resolve, reject) => {
      this.auth0.checkSession({}, (err, authResult) => {
        console.log('[renewSession] renewing...')
        if (authResult && authResult.accessToken && authResult.idToken) {
          console.log('[renewSession] success.')
          this.setSession(authResult)
          resolve()
        } else if (err) {
          console.error('[renewSession] failed.', err)
          this.logout()
          reject()
        }
      })
    })
  }

  isAuthenticated = () => new Date().getTime() < this.expiresAt

  isLoggedIn = () => localStorage.getItem('isLoggedIn') === 'true'

  getAccessToken = () => this.accessToken

  getIdToken = () => this.idToken

  getProfile = () => this.profile
}

const auth0Client = new Auth()

export default auth0Client
