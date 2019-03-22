import axios from 'axios'

/**
 * @returns a wrapper function around the eventHandler
 *
 * * Prevents the event's default behavior before passing it to eventHandler
 * * Useful for onClick's in <a> tags and to prevent form submission
 */
export const preventDefault = eventHandler => e => {
  e.preventDefault()
  eventHandler(e)
}

export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}
