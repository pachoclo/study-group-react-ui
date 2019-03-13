import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { renewSession } from './store/actions/authActions'
import authClient from './Auth/Auth'
import Header from './components/Header'
import Home from './components/Home'
import About from './components/About'
import LoginCallback from './components/LoginCallback'

function App({ renewSession }) {
  useEffect(() => {
    console.log('checking for open sessions...')
    authClient.isLoggedIn() && renewSession()
  })

  return (
    <Router>
      <>
        <Header />
        <main>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/loginCallback" component={LoginCallback} />
        </main>
      </>
    </Router>
  )
}

export default connect(
  null,
  { renewSession }
)(App)
