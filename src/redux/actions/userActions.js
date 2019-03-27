import axios from 'axios'
import { getErrors } from '../actions/errorActions'

export const FETCH_USER = '[user] FETCH'
export const USER_ERROR = '[user] USER_ERROR'
export const SET_USER = '[user] SET'

export const setUser = user => ({
  type: SET_USER,
  payload: user
})

export const userError = () => ({
  type: USER_ERROR
})

// thunks
export const fetchUser = () => dispatch => {
  dispatch({
    type: FETCH_USER
  })
  axios
    .get('/api/user', {})
    .then(res => dispatch(setUser(res)))
    .catch(err => {
      dispatch(userError())
      dispatch(getErrors(err))
    })
}
