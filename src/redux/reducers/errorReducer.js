import { GET_ERRORS } from '../actions/errorActions'

const initialState = {
  err: '',
  followUp: ''
}

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload
    default:
      return state
  }
}

export default errorReducer
