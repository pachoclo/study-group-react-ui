import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loginRequest, logoutRequest } from '../../redux/actions/authActions'
import { preventDefault } from '../../util'
import { Link } from 'react-router-dom'

const Navbar = ({ isAuthenticated, loginRequest, logoutRequest, avatarUrl, nickname }) => (
  <nav className='navbar navbar-expand-sm navbar-dark bg-dark'>
    <div className='container'>
      <Link className='navbar-brand' to='/'>
        StudyGroup
      </Link>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#mobile-nav'
      >
        <span className='navbar-toggler-icon' />
      </button>

      <div className='collapse navbar-collapse' id='mobile-nav'>
        <ul className='navbar-nav ml-auto'>
          {!isAuthenticated && (
            <li className='nav-item'>
              <a className='nav-link' href='/login' onClick={preventDefault(loginRequest)}>
                Login
              </a>
            </li>
          )}
          {isAuthenticated && (
            <>
              <li className='nav-item'>
                <Link className='nav-link' to='/groups'>
                  Groups
                </Link>
              </li>
              <div className='dropdown'>
                <img
                  src={avatarUrl}
                  alt={nickname}
                  className='rounded-circle avatar-img'
                  id='dropdownMenu2'
                  data-toggle='dropdown'
                  aria-haspopup='true'
                  aria-expanded='false'
                />
                <div className='dropdown-menu' aria-labelledby='dropdownMenu2'>
                  <h6 className='dropdown-header'>{nickname}</h6>
                  <div className='dropdown-divider' />
                  <a
                    className='dropdown-item'
                    href='/logout'
                    onClick={preventDefault(logoutRequest)}
                  >
                    Logout
                  </a>
                </div>
              </div>
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
