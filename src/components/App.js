import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { renewSession } from '../store/actions/authActions'
import '../App.css'
import authClient from '../Auth/Auth'
import Home from './Home'
import About from './About'
import LoginCallback from './LoginCallback'
import Navbar from './layout/Navbar'
import Footer from './layout/Footer'
import Landing from './layout/Landing'

function App({ renewSession }) {
  useEffect(() => {
    // if the user hasn't logged out, try to renew the session
    authClient.isLoggedIn() && renewSession()
  })

  return (
    <Router>
      <>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <Route path="/loginCallback" component={LoginCallback} />
        {/* <main>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
        </main> */}
        <Footer />
      </>
    </Router>
  )
}

export default connect(
  null,
  { renewSession }
)(App)
