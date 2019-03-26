import authClient from '../../Auth/Auth'
import { setupMockLocalStorage } from '../testUtils'

jest.mock('auth0-js')

const mockAuthResult = {
  accessToken: 'elAccessToken',
  idToken: 'elIdToken',
  idTokenPayload: { fake: 'profile' },
  expiresIn: 7200
}

describe('Auth Class Test', () => {
  beforeEach(() => {
    setupMockLocalStorage()
  })

  it('delegates login to auth0 [authorization endpoint]', () => {
    authClient.login()
    expect(authClient.login).not.toThrow()
    expect(jest.isMockFunction(authClient.auth0.authorize)).toBeTruthy()
    expect(authClient.auth0.authorize).toHaveBeenCalled()
  })

  it('should handle authentication callback payload', () => {
    authClient.auth0.parseHash = jest.fn(cb => cb(null, mockAuthResult))
    const setSessionSpy = jest.spyOn(authClient, 'setSession')
    return authClient.handleAuthentication().then(() => {
      expect(authClient.auth0.parseHash).toHaveBeenCalled()
      expect(setSessionSpy).toHaveBeenCalled()
    })
  })

  it('should reject on authentication error', () => {
    authClient.auth0.parseHash = jest.fn(cb => cb('el error'))
    return authClient.handleAuthentication().catch(err => expect(err).toEqual('el error'))
  })

  it('should set the state correctly when setSession is called', () => {
    authClient.setSession(mockAuthResult)
    expect(authClient.getAccessToken()).toBe(mockAuthResult.accessToken)
    expect(authClient.getIdToken()).toBe(mockAuthResult.idToken)
    expect(authClient.getProfile()).toBe(mockAuthResult.idTokenPayload)
    expect(authClient.isAuthenticated()).toBeTruthy()
  })

  it("should logout correctly (remove flag, call auth0's logout)", () => {
    authClient.logout()
    expect(authClient.logout).not.toThrow()
    expect(localStorage.removeItem).toBeCalledWith('isLoggedIn')
    expect(authClient.auth0.logout).toHaveBeenCalled()
  })
})
