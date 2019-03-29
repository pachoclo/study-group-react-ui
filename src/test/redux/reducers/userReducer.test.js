import userReducer from '../../../redux/reducers/userReducer'
import * as userActions from '../../../redux/actions/userActions'

describe('userReducer Test', () => {
  it('should handle SET_USER action', () => {
    const profileMock = { name: 'elName' }
    const expectedState = {
      fetching: false,
      profile: profileMock
    }
    const action = userActions.setUser(profileMock)
    expect(userReducer(null, action)).toEqual(expectedState)
  })
})
