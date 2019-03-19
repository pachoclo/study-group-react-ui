import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { preventDefault } from '../../utils'
import { loginRequest } from '../../store/actions/authActions'

const Landing = ({ isAuthenticated, loginRequest }) => {
  return (
    <div className="landing">
      <div className="dark-overlay landing-inner text-light">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="display-3 mb-4">StudyGroup</h1>
              <p className="lead">
                Gets you working with your peers pronto.
                <br />
                Setup meetings and organize your materials in one place.sda
              </p>
              {!isAuthenticated && (
                <a
                  href="login.html"
                  className="btn btn-lg btn-info mt-5"
                  onClick={preventDefault(loginRequest)}
                >
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

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.authenticated
})

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
  loginRequest: PropTypes.func
}

export default connect(
  mapStateToProps,
  { loginRequest }
)(Landing)
