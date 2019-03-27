import authReducer from '../../../redux/reducers/authReducer'
import * as authActions from '../../../redux/actions/authActions'
import authClient from '../../../Auth/Auth'

jest.mock('../../../Auth/Auth')

const profileMock = {
  nickname: 'elNickname',
  name: 'elName',
  email: 'elEmail',
  picture: 'elPic'
}

describe('authReducer Test', () => {
  it('should handle a LOGIN_REQUEST action', () => {
    const expectedState = {
      authenticated: false,
      pending: true,
      profile: {}
    }
    authClient.login = jest.fn()
    const action = authActions.loginRequest()
    expect(authReducer(null, action)).toEqual(expectedState)
    expect(authClient.login).toHaveBeenCalled()
  })

  it('should handle a RENEW_SESSION action', () => {
    const expectedState = {
      authenticated: false,
      pending: true,
      profile: {}
    }
    const action = { type: authActions.RENEW_SESSION }
    expect(authReducer(undefined, action)).toEqual(expectedState)
  })

  it('should handle a LOGIN_RESPONSE action', () => {
    const expectedState = {
      authenticated: false,
      pending: true,
      profile: {}
    }
    const action = { type: authActions.LOGIN_RESPONSE }
    expect(authReducer(undefined, action)).toEqual(expectedState)
  })

  it('should handle a LOGIN_SUCCESS action', () => {
    const expectedState = {
      authenticated: true,
      pending: false,
      profile: profileMock
    }
    const action = authActions.loginSuccess(profileMock)
    expect(authReducer(undefined, action)).toEqual(expectedState)
  })

  it('should handle a LOGIN_ERROR action', () => {
    const expectedState = {
      authenticated: false,
      pending: false,
      profile: {}
    }
    const action = authActions.loginError()
    expect(authReducer(undefined, action)).toEqual(expectedState)
  })

  it('should handle a LOGOUT_ERROR action', () => {
    const expectedState = {
      authenticated: false,
      pending: false,
      profile: {}
    }
    const action = authActions.logoutError()
    expect(authReducer(undefined, action)).toEqual(expectedState)
  })

  it('should handle a LOGOUT action', () => {
    const expectedState = {
      authenticated: false,
      pending: true,
      profile: {}
    }
    authClient.logout = jest.fn()
    const action = authActions.logoutRequest()
    expect(authReducer(undefined, action)).toEqual(expectedState)
    expect(authClient.logout).toHaveBeenCalled()
  })
})
