import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { loginResponseHandler } from '../store/actions/authActions'

const LoginCallback = ({ isAuthenticated, loginResponseHandler, location }) => {
  if (isAuthenticated) {
    return <Redirect to={'/'} push />
  }

  if (/access_token|id_token|error/.test(location.hash)) {
    loginResponseHandler()
    return <p>Authenticating...</p>
  }
}

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.authenticated
})

const actions = {
  loginResponseHandler
}

export default connect(
  mapStateToProps,
  actions
)(LoginCallback)
