import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const defaults = {
  initialProgress: 5,
  intervalMillis: 500,
  increment: 5
}

/**
 * Renders a loader that automatically increments its progress
 *
 * @param {number} intervalMillis specifies how often the progress should be increased
 */
export const AutoProgressLoader = ({ intervalMillis = defaults.intervalMillis }) => {
  const [progress, setProgress] = useState(defaults.initialProgress)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setProgress(currentProgress => {
        const newProgress = currentProgress + 5
        return newProgress <= 100 ? newProgress : currentProgress
      })
    }, intervalMillis)

    return function cleanUp () {
      clearInterval(intervalId)
      setProgress(100)
    }
  }, [intervalMillis])

  return (
    <div className='progress' style={{ height: '4px', backgroundColor: 'gray', borderRadius: 0 }}>
      <div
        className='progress-bar progress-bar-striped progress-bar-animated bg-warning'
        role='progressbar'
        aria-valuenow={progress}
        aria-valuemin='0'
        aria-valuemax='100'
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

AutoProgressLoader.propTypes = {
  intervalMillis: PropTypes.number
}

export default AutoProgressLoader
