import React from 'react'
import PropTypes from 'prop-types'

function ErrorAlert ({ error, followUp }) {
  return (
    <div className='alert alert-danger alert-dismissible mb-0' role='alert'>
      <i className='icon-left fas fa-exclamation-triangle mr-3' />
      <strong>{error}</strong> <span className='ml-2'>{followUp}</span>
      <button type='button' className='close' data-dismiss='alert' aria-label='Close'>
        <span aria-hidden='true'>&times;</span>
      </button>
    </div>
  )
}

Error.propTypes = {
  error: PropTypes.string,
  followUp: PropTypes.string
}

export default ErrorAlert
