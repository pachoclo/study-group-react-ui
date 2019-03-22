import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { loginResponse } from '../redux/actions/authActions'

const LoginCallback = ({ isAuthenticated, handleLoginResponse, location }) => {
  if (isAuthenticated) {
    return <Redirect to={'/'} push />
  }

  if (/access_token|id_token|error/.test(location.hash)) {
    handleLoginResponse()
    return <p>Authenticating...</p>
  }
}

LoginCallback.propTypes = {
  isAuthenticated: PropTypes.bool,
  handleLoginResponse: PropTypes.func,
  location: PropTypes.object
}

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.authenticated
})

const actions = {
  handleLoginResponse: loginResponse
}

export default connect(
  mapStateToProps,
  actions
)(LoginCallback)
