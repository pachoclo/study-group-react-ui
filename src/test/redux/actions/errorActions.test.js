import * as errorActions from '../../../redux/actions/errorActions'

describe('Error Action creators test', () => {
  it('should create a GET_ERRORS action', () => {
    const expectedAction = {
      type: errorActions.GET_ERRORS,
      payload: {
        err: 'el error',
        followUp: 'el followup'
      }
    }
    expect(errorActions.getErrors('el error', 'el followup')).toEqual(expectedAction)
  })
})
