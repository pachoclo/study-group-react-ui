import { FETCH_USER, SET_USER, USER_ERROR } from '../actions/userActions'

const initialState = {
  fetching: false,
  profile: null
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER:
      return {
        fetching: true
      }

    case SET_USER:
      return {
        fetching: false,
        profile: action.payload
      }

    case USER_ERROR:
      return initialState

    default:
      return state
  }
}

export default userReducer
