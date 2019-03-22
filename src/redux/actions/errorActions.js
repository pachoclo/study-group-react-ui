export const GET_ERRORS = '[error] GET_ERRORS'

export const getErrors = err => ({
  type: GET_ERRORS,
  payload: err.response.data
})
