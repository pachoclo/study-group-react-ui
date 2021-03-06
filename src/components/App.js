import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { renewSession } from '../redux/actions/authActions'
import '../App.css'
import authClient from '../Auth/Auth'
import LoginCallback from './LoginCallback'
import Navbar from './Navbar'
import ErrorAlert from './ErrorAlert'
import Landing from './Landing'
import LoaderContainer from './LoaderContainer'
import { debug } from '../util'

export function App ({ renewSession, error }) {
  useEffect(() => {
    // if the user hasn't logged out, try to renew the session
    debug('renewing session')
    authClient.isLoggedIn() && renewSession()
  }, [])

  return (
    <Router>
      <>
        <Navbar />
        <LoaderContainer />
        <div className='{//container}'>
          {error.err && <ErrorAlert error={error.err} followUp={error.followUp} />}
          <Route exact path='/' component={Landing} />
          <Route path='/loginCallback' component={LoginCallback} />
        </div>
      </>
    </Router>
  )
}

App.propTypes = {
  renewSession: PropTypes.func,
  error: PropTypes.object
}

const mapStateToProps = ({ error }) => ({ error })

export default connect(
  mapStateToProps,
  { renewSession }
)(App)
