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
