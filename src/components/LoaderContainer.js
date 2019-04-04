import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AutoProgressLoader from './AutoProgressLoader'

export const LoaderContainer = ({ loading, intervalMillis }) => {
  return loading ? <AutoProgressLoader intervalMillis={intervalMillis} /> : null
}

LoaderContainer.propTypes = {
  loading: PropTypes.bool,
  intervalMillis: PropTypes.number
}

const mapStateToProps = ({ loader }) => loader

export default connect(mapStateToProps)(LoaderContainer)
