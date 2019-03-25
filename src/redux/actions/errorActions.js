export const GET_ERRORS = '[error] GET_ERRORS'

export const getErrors = (err, followUp) => ({
  type: GET_ERRORS,
  payload: {
    err: (err.response && err.response.data) || err,
    followUp
  }
})
