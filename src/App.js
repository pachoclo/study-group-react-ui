import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Auth from './Auth/Auth'
import Header from './components/layout/Header'
import Home from './components/Home'
import About from './components/About'
import LoginCallback from './components/LoginCallback'

class App extends Component {
  constructor() {
    super()
    this.auth = new Auth()
  }

  componentDidMount() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.auth.renewSession()
    }
  }

  render() {
    return (
      <Router>
        <>
          <Header auth={this.auth} />
          <main>
            <Route exact path="/" render={props => <Home auth={this.auth} {...props} />} />
            <Route path="/about" render={props => <About auth={this.auth} {...props} />} />
            <Route path="/loginCallback" render={props => <LoginCallback auth={this.auth} {...props} />} />
          </main>
        </>
      </Router>
    )
  }
}

export default App
