import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { loginResponse } from '../redux/actions/authActions'

export const LoginCallback = ({ isAuthenticated = true, handleLoginResponse, location }) => {
  if (!isAuthenticated && /access_token|id_token|error/.test(location.hash)) {
    handleLoginResponse()
    return <p>Authenticating...</p>
  }
  return <Redirect to={'/'} push />
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
