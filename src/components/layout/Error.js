import React from 'react'
import PropTypes from 'prop-types'

function Error({ error, followUp }) {
  return (
    <div className="alert alert-danger alert-dismissible mb-0" role="alert">
      <strong>{error}</strong> {followUp}
      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  )
}

Error.propTypes = {
  error: PropTypes.string,
  followUp: PropTypes.string
}

export default Error
