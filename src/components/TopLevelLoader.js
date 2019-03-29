import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

const defaults = {
  progress: 5,
  intervalMillis: 500,
  increment: 5
}

export const TopLevelLoader = ({ loading, intervalMillis = defaults.intervalMillis }) => {
  if (!loading) {
    return <></>
  }

  const [progress, setProgress] = useState(defaults.progress)

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newProgress = progress + 5
      newProgress <= 100 && setProgress(newProgress)
    }, intervalMillis)

    return function cleanUp() {
      clearInterval(intervalId)
    }
  })

  return (
    <div className="progress" style={{ height: '4px', backgroundColor: 'gray', borderRadius: 0 }}>
      <div
        className="progress-bar progress-bar-striped progress-bar-animated bg-warning"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin="0"
        aria-valuemax="100"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

const mapStateToProps = ({ loader }) => loader

export default connect(mapStateToProps)(TopLevelLoader)
