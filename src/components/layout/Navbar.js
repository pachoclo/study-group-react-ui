import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loginRequest, logoutRequest } from '../../store/actions/authActions'
import { preventDefault } from '../../utils'

const Navbar = ({ isAuthenticated, loginRequest, logoutRequest, avatarUrl, nickname }) => (
  <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
    <div className="container">
      <a className="navbar-brand" href="landing.html">
        StudyGroup
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#mobile-nav"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav ml-auto">
          {!isAuthenticated && (
            <li className="nav-item">
              <a className="nav-link" medium href="/login" onClick={preventDefault(loginRequest)}>
                Login
              </a>
            </li>
          )}
          {isAuthenticated && (
            <>
              <li className="nav-item">
                <a
                  className="nav-link small"
                  href="/logout"
                  onClick={preventDefault(logoutRequest)}
                >
                  Logout
                </a>
              </li>
              <li className="nav-item">
                <img src={avatarUrl} alt={nickname} className="rounded-circle avatar-img mt-1" />
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  </nav>
)

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool,
  loginRequest: PropTypes.func,
  logoutRequest: PropTypes.func,
  avatarUrl: PropTypes.string,
  nickname: PropTypes.string
}

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.authenticated,
  avatarUrl: auth.profile.picture,
  nickname: auth.profile.nickname
})

const actions = { loginRequest, logoutRequest }

export default connect(
  mapStateToProps,
  actions
)(Navbar)
