import axios from 'axios'

/**
 * @returns a wrapper function around the eventHandler
 *
 * - Prevents the event's default behavior before passing it to eventHandler
 * - Useful for onClick's in <a> tags and to prevent form submission
 */
export const preventDefault = eventHandler => e => {
  e.preventDefault()
  eventHandler(e)
}

/**
 * Configures axios to add the token to the Authentication header on every request
 *
 * @param {} token access token
 */
export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

/**
 * Logs message to console ONLY in development mode
 *
 * @param {string} message to log
 */
export const debug = message => {
  if (process.env.NODE_ENV === 'development') {
    console.log(message)
  }
}
