import React, { Component } from 'react'
import { Router, Route, Link } from 'react-router-dom'
import history from './history'
import Auth from './Auth/Auth'

const Menu = ({ auth }) => (
  <div>
    {!auth.isAuthenticated() && <button onClick={() => auth.login()}>Login</button>}
    {auth.isAuthenticated() && <button onClick={() => auth.logout()}>Logout</button>}

    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="about">About</Link>
      </li>
    </ul>
  </div>
)

const Home = ({ auth }) => (
  <>
    <h2>Home</h2>
    {auth.isAuthenticated() && <p>La casaa</p>}
    {!auth.isAuthenticated() && <p>Not logged In!!! Please login mr/mrs...</p>}
  </>
)

const About = ({ auth }) => (
  <>
    <h2>About</h2>
    {auth.isAuthenticated() && <p>(c) Study Groupssss weee</p>}
    {!auth.isAuthenticated() && <p>Not logged In!!! Please login mr/mrs...</p>}
  </>
)

class App extends Component {
  auth = new Auth()

  handleAuthentication = ({ location }) => {
    if (/access_token|id_token|error/.test(location.hash)) {
      this.auth.handleAuthentication()
    }
  }

  goTo = route => {
    this.history.replace(`/${route}`)
  }

  login = () => {
    this.auth.login()
  }

  logout = () => {
    this.auth.logout()
  }

  componentDidMount() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.auth.renewSession()
    }
  }

  render() {
    return (
      <Router history={history}>
        <div className="App">
          <header>
            <Menu auth={this.auth} />
          </header>
          <hr />
          <main>
            <Route exact path="/" render={props => <Home auth={this.auth} {...props} />} />
            <Route path="/about" render={props => <About auth={this.auth} {...props} />} />
            <Route
              path="/callback"
              render={props => {
                this.handleAuthentication(props)
                return <p>Authenticating...</p>
              }}
            />
          </main>
        </div>
      </Router>
    )
  }
}

export default App
