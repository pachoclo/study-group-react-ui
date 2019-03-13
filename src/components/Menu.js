import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { loginRequest, logoutRequest } from '../store/actions/authActions'

const Menu = ({ isAuthenticated, loginRequest, logoutRequest }) => {
  return (
    <>
      {!isAuthenticated && <button onClick={loginRequest}>Login</button>}
      {isAuthenticated && <button onClick={logoutRequest}>Logout</button>}
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="about">About</Link>
        </li>
      </ul>
    </>
  )
}

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.authenticated
})

const actions = { loginRequest, logoutRequest }

export default connect(
  mapStateToProps,
  actions
)(Menu)
