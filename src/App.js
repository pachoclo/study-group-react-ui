import React, { Component } from 'react'
import { Router, Route, Link } from 'react-router-dom'
import history from './history'
import Auth from './Auth/Auth'
// import Header from './components/layout/Header'

const Menu = ({ auth }) => (
  <>
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
  </>
)

const Home = ({ auth }) => (
  <>
    <h2>Home</h2>
    {auth.isAuthenticated() && (
      <>
        <p>La casaa</p>
        <p>Access Token: {localStorage.getItem('accessToken')}</p>
        <p>ID Token: {localStorage.getItem('idToken')}</p>
      </>
    )}
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

const auth = new Auth()

class App extends Component {
  constructor() {
    super()
    this.auth = auth
  }

  handleAuthentication = ({ location }) => {
    if (/access_token|id_token|error/.test(location.hash)) {
      this.auth.handleAuthentication()
    }
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
          {/* <Header auth={this.auth} /> */}
          <header>
            <Menu auth={this.auth} />
          </header>
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
