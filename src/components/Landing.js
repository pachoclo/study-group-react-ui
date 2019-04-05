import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { preventDefault } from '../util'
import { loginRequest } from '../redux/actions/authActions'

const Landing = ({ isAuthenticated, loginRequest, loading }) => {
  return (
    <div className='landing'>
      <div className='dark-overlay landing-inner text-light'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 text-center'>
              <h1 className='display-3 mb-4'>StudyGroup</h1>
              <p className='lead'>
                Gets you working with your peers pronto.
                <br />
                Setup meetings and organize your materials in one place
              </p>
              {!isAuthenticated && !loading && (
                <a href='login.html' className='btn btn-lg btn-info mt-5' onClick={preventDefault(loginRequest)}>
                  Login
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ auth, loader }) => ({
  isAuthenticated: auth.authenticated,
  loading: loader.loading
})

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
  loginRequest: PropTypes.func,
  loading: PropTypes.bool
}

export default connect(
  mapStateToProps,
  { loginRequest }
)(Landing)
