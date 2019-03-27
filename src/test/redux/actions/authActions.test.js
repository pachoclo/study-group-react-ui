import * as authActions from '../../../redux/actions/authActions'
import { getErrors } from '../../../redux/actions/errorActions'
import authClient from '../../../Auth/Auth'

describe('Auth Action Creators', () => {
  it('should create an action of type login request', () => {
    const expectedAction = {
      type: authActions.LOGIN_REQUEST
    }
    expect(authActions.loginRequest()).toEqual(expectedAction)
  })

  it('should create an action of type login success', () => {
    const mockProfile = {}
    const expectedAction = {
      type: authActions.LOGIN_SUCCESS,
      payload: mockProfile
    }
    expect(authActions.loginSuccess(mockProfile)).toEqual(expectedAction)
  })

  it('should create an action of type login error', () => {
    const expectedAction = {
      type: authActions.LOGIN_ERROR
    }
    expect(authActions.loginError()).toEqual(expectedAction)
  })

  it('should create an action of type logout request', () => {
    const expectedAction = {
      type: authActions.LOGOUT
    }
    expect(authActions.logoutRequest()).toEqual(expectedAction)
  })

  it('should create an action of type logout error', () => {
    const expectedAction = {
      type: authActions.LOGOUT_ERROR
    }
    expect(authActions.logoutError()).toEqual(expectedAction)
  })

  it('should create an action of type renew session error', () => {
    const expectedAction = {
      type: authActions.RENEW_SESSION_ERROR
    }
    expect(authActions.renewSessionError()).toEqual(expectedAction)
  })

  describe('loginResponse thunk', () => {
    const profileMock = {
      nickname: 'elNickname',
      name: 'elName',
      email: 'elEmail',
      picture: 'elPic'
    }

    it('should dispatch LOGIN_RESPONSE and loginSuccess', async () => {
      // mock authClient (with Profile)
      const elPromise = Promise.resolve()
      authClient.handleAuthentication = jest.fn(() => elPromise)
      authClient.profile = profileMock

      // mock dispatch
      const dispatchMock = jest.fn()

      // use the thunk
      authActions.loginResponse()(dispatchMock)

      // check that it dispatches LOGIN_RESPONSE
      expect(dispatchMock).toHaveBeenCalledWith({ type: authActions.LOGIN_RESPONSE })

      // gotta wait for that promise
      await elPromise

      // check that authClient.handleAuthentication is called
      expect(authClient.handleAuthentication).toHaveBeenCalled()

      // check that it dispatches loginSuccess with the right payload
      const expectedAction = {
        type: '[auth] LOGIN_SUCCESS',
        payload: profileMock
      }
      expect(dispatchMock).toHaveBeenCalledWith(expectedAction)
    })

    it('should dispatch loginError & getErrors on auth handling failure', async () => {
      // mock authClient (with Profile) -> handleAuthentication call returns a rejected promise
      const elRejected = Promise.reject('auth0 crapped out')
      authClient.handleAuthentication = jest.fn(() => elRejected)

      // mock dispatch
      const dispatchMock = jest.fn()

      // use the thunk
      authActions.loginResponse()(dispatchMock)

      // check that it dispatches LOGIN_RESPONSE
      expect(dispatchMock).toHaveBeenCalledWith({ type: authActions.LOGIN_RESPONSE })

      // check that authClient.renewSession is called
      expect(authClient.handleAuthentication).toHaveBeenCalled()

      // wait for that pesky promise
      try {
        await elRejected
      } catch (error) {
        // check that it dispatches renewSession & getErrors with the right payload
        expect(dispatchMock).toHaveBeenCalledWith({ type: authActions.LOGIN_ERROR })
        expect(dispatchMock).toHaveBeenCalledWith(getErrors('auth0 crapped out'))
      }
    })
  })

  describe('renewSession thunk', () => {
    const profileMock = {
      nickname: 'elNickname',
      name: 'elName',
      email: 'elEmail',
      picture: 'elPic'
    }

    it('should dispatch RENEW_SESSION and loginSuccess', async () => {
      // mock authClient (with Profile)
      const elPromise = Promise.resolve()
      authClient.renewSession = jest.fn(() => elPromise)
      authClient.profile = profileMock

      // mock dispatch
      const dispatchMock = jest.fn()

      // use the thunk
      authActions.renewSession()(dispatchMock)

      // check that it dispatches RENEW_SESSION
      expect(dispatchMock).toHaveBeenCalledWith({ type: authActions.RENEW_SESSION })

      // gotta wait for that promise
      await elPromise

      // check that authClient.renewSession is called
      expect(authClient.renewSession).toHaveBeenCalled()

      // check that it dispatches loginSuccess with the right payload
      const expectedAction = {
        type: '[auth] LOGIN_SUCCESS',
        payload: profileMock
      }
      expect(dispatchMock).toHaveBeenCalledWith(expectedAction)
    })

    it('should dispatch renewSession error & getErrors on session renewal failure', async () => {
      // mock authClient (with Profile) -> renewSession call returns a rejected promise
      const elRejected = Promise.reject('auth0 crapped out')
      authClient.renewSession = jest.fn(() => elRejected)

      // mock dispatch
      const dispatchMock = jest.fn()

      // use the thunk
      authActions.renewSession()(dispatchMock)

      // check that it dispatches RENEW_SESSION
      expect(dispatchMock).toHaveBeenCalledWith({ type: authActions.RENEW_SESSION })

      // check that authClient.renewSession is called
      expect(authClient.renewSession).toHaveBeenCalled()

      // wait for that pesky promise
      try {
        await elRejected
      } catch (error) {
        // check that it dispatches renewSession & getErrors with the right payload
        expect(dispatchMock).toHaveBeenCalledWith({ type: authActions.RENEW_SESSION_ERROR })
        expect(dispatchMock).toHaveBeenCalledWith(getErrors('auth0 crapped out'))
      }
    })
  })
})
