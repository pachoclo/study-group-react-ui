import * as userActions from '../../../redux/actions/userActions'
import { getErrors } from '../../../redux/actions/errorActions'
import axios from 'axios'

describe('User Action creators', () => {
  const userMock = {
    name: 'el user'
  }

  it('should create a SET_USER action', () => {
    const expectedAction = {
      type: userActions.SET_USER,
      payload: userMock
    }
    expect(userActions.setUser(userMock)).toEqual(expectedAction)
  })

  it('should create a USER_ERROR action', () => {
    const expectedAction = {
      type: userActions.USER_ERROR
    }
    expect(userActions.userError()).toEqual(expectedAction)
  })

  describe('fetchUser thunk', () => {
    jest.mock('axios')

    it('should dispatch FETCH_USER & SET_USER on success', async () => {
      const elPromise = Promise.resolve(userMock)
      axios.get = jest.fn(url => elPromise)

      const dispatchMock = jest.fn()

      // call the action creator
      userActions.fetchUser()(dispatchMock)

      // check it dispatched FETCH_USER
      expect(dispatchMock).toHaveBeenCalledWith({
        type: userActions.FETCH_USER
      })

      // wait for the promise
      await elPromise

      // success -> dispatch SET_USER with correct payload
      expect(dispatchMock).toHaveBeenCalledWith({
        type: userActions.SET_USER,
        payload: userMock
      })
    })

    it('should dispatch USER_ERROR & getErrors on Failure', async () => {
      const elPromise = Promise.reject(new Error('axios is being naughty'))
      axios.get = jest.fn(url => elPromise)

      const dispatchMock = jest.fn()

      // call the action creator
      userActions.fetchUser()(dispatchMock)

      // check it dispatched FETCH_USER
      expect(dispatchMock).toHaveBeenCalledWith({
        type: userActions.FETCH_USER
      })

      // wait for the promise
      try {
        await elPromise
      } catch (e) {
        // failure -> dispatch USER_ERROR & getErrors
        expect(dispatchMock).toHaveBeenCalledWith({
          type: userActions.USER_ERROR
        })

        expect(dispatchMock).toHaveBeenCalledWith(getErrors(e))
      }
    })
  })
})
