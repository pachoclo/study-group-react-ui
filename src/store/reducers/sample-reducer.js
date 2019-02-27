import { SAMPLE_ACTION_TYPE } from '../actions/types'

const initialState = {
  someSetting: false
}

const sampleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAMPLE_ACTION_TYPE:
      return {
        ...state,
        someSetting: true
      }
    default:
      return state
  }
}

export default sampleReducer
