import { GET_ERRORS } from '../actions/errorActions'

const initialState = {}

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return {
        err: action.payload.err,
        followUp: action.payload.followUp
      }
    default:
      return state
  }
}

export default errorReducer
