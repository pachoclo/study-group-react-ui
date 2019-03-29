import loaderReducer from '../../../redux/reducers/loaderReducer'
import * as loaderActions from '../../../redux/actions/loaderActions'

describe('authReducer Test', () => {
  it('should handle a SET_TOP_LOADER action', () => {
    const expectedState = {
      loading: true,
      intervalMillis: 30
    }
    const action = loaderActions.setLoader(true, 30)
    expect(loaderReducer(null, action)).toEqual(expectedState)
  })

  it('should handle a SET_TOP_LOADER action without specific interval', () => {
    const expectedState = {
      loading: true,
      intervalMillis: 500
    }
    const action = loaderActions.setLoader(true)
    expect(loaderReducer(null, action)).toEqual(expectedState)
  })
})
