/* global localStorage */

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

  describe('login', () => {
    it('should delegate login to auth0 [authorization endpoint]', () => {
      authClient.login()
      expect(authClient.login).not.toThrow()
      expect(jest.isMockFunction(authClient.auth0.authorize)).toBeTruthy()
      expect(authClient.auth0.authorize).toHaveBeenCalled()
    })
  })

  describe('handleAuthentication', () => {
    it('should handle authentication callback & payload (authResult)', () => {
      authClient.auth0.parseHash = jest.fn(cb => cb(null, mockAuthResult))
      const setSessionSpy = jest.spyOn(authClient, 'setSession')
      return authClient.handleAuthentication().then(() => {
        expect(authClient.auth0.parseHash).toHaveBeenCalled()
        expect(setSessionSpy).toHaveBeenCalled()
      })
    })

    it('should reject on authentication error', () => {
      const expectedError = new Error('el error')
      authClient.auth0.parseHash = jest.fn(cb => cb(expectedError))
      return authClient.handleAuthentication().catch(err => expect(err).toEqual(expectedError))
    })

    it('should reject on session renewal with empty authResult', () => {
      authClient.auth0.parseHash = jest.fn(cb => cb(null, null))
      return authClient
        .handleAuthentication()
        .catch(err => expect(err).toEqual('auth0 failed handling authentication'))
    })
  })

  describe('setSession', () => {
    it('should set the state correctly when setSession is called', () => {
      authClient.setSession(mockAuthResult)
      expect(authClient.getAccessToken()).toBe(mockAuthResult.accessToken)
      expect(authClient.getIdToken()).toBe(mockAuthResult.idToken)
      expect(authClient.getProfile()).toBe(mockAuthResult.idTokenPayload)
      expect(authClient.isAuthenticated()).toBeTruthy()
      expect(authClient.isLoggedIn()).toBeTruthy()
    })
  })

  describe('setSession', () => {
    it("should logout correctly (remove flag, call auth0's logout)", () => {
      authClient.logout()
      expect(authClient.logout).not.toThrow()
      expect(localStorage.removeItem).toBeCalledWith('isLoggedIn')
      expect(authClient.auth0.logout).toHaveBeenCalled()
    })
  })

  describe('renewSession', () => {
    it('should renew session and handle auth result correctly', () => {
      authClient.auth0.checkSession = jest.fn((_, cb) => cb(null, mockAuthResult))
      const setSessionSpy = jest.spyOn(authClient, 'setSession')
      return authClient.renewSession().then(() => {
        expect(authClient.auth0.parseHash).toHaveBeenCalled()
        expect(setSessionSpy).toHaveBeenCalled()
      })
    })

    it('should reject on session renewal error', () => {
      const expectedError = new Error('Auth0 errorrr')
      authClient.auth0.checkSession = jest.fn((_, cb) => cb(expectedError))
      return authClient.renewSession().catch(err => expect(err).toEqual(expectedError))
    })

    it('should reject on session renewal with empty authResult', () => {
      const expectedError = new Error('[renewSession] failed. Empty authResult from Auth0.')
      authClient.auth0.checkSession = jest.fn((_, cb) => cb(null, null))
      return authClient.renewSession().catch(err => expect(err).toEqual(expectedError))
    })
  })
})
