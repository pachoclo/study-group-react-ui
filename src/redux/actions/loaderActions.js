export const SET_TOP_LOADER = '[loader] SET_TOP_LOADER'

export const setLoader = (loading, intervalMillis) => ({
  type: SET_TOP_LOADER,
  payload: {
    loading,
    intervalMillis
  }
})
