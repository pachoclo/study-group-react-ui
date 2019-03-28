import authReducer from '../../../redux/reducers/errorReducer'
import * as errorActions from '../../../redux/actions/errorActions'

describe('authReducer Test', () => {
  it('should handle a LOGIN_REQUEST action', () => {
    const expectedState = {
      err: 'el Error',
      followUp: 'el FollowUp'
    }
    const action = errorActions.getErrors('el Error', 'el FollowUp')
    expect(authReducer(null, action)).toEqual(expectedState)
  })
})
