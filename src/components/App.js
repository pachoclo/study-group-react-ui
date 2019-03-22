import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { renewSession } from '../redux/actions/authActions'
import '../App.css'
import authClient from '../Auth/Auth'
import LoginCallback from './LoginCallback'
import Navbar from './layout/Navbar'
import Error from './layout/Error'
import Landing from './layout/Landing'

function App({ renewSession, error }) {
  useEffect(() => {
    // if the user hasn't logged out, try to renew the session
    authClient.isLoggedIn() && renewSession()
  })

  return (
    <Router>
      <>
        <Navbar />
        <div className="{//container}">
          {error.err && <Error error="error.err" followUp="error.followUp" />}
          <Route exact path="/" component={Landing} />
          {/* <Route exact path="/dashboard" component={Dashboard}  */}
          <Route path="/loginCallback" component={LoginCallback} />
        </div>
      </>
    </Router>
  )
}

Error.propTypes = {
  error: PropTypes.object
}

const mapStateToProps = ({ error }) => ({ error })

export default connect(
  mapStateToProps,
  { renewSession }
)(App)
