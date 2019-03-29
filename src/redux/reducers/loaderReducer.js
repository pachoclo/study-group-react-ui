import * as loaderActions from '../actions/loaderActions'

const initialState = {
  loading: false,
  intervalMillis: 500
}

const loaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case loaderActions.SET_TOP_LOADER:
      return {
        loading: action.payload.loading,
        intervalMillis: action.payload.intervalMillis ? action.payload.intervalMillis : 500
      }

    default:
      return state
  }
}

export default loaderReducer
