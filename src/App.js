import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const Menu = () => (
  <div>
    <ul>
      <li>
        <Link to="login">Login</Link>
      </li>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="about">About</Link>
      </li>
    </ul>
  </div>
)

const Home = () => (
  <>
    <h2>Home</h2>
    <p>La casaa</p>
  </>
)
const About = () => (
  <>
    <h2>About</h2>
    <p>(c) Study Groupssss weee</p>
  </>
)

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header>
            <Menu />
          </header>
          <hr />
          <main>
            <Route exact path="/" component={Home} />
            <Route path="/login" />
            <Route path="/about" component={About} />
          </main>
        </div>
      </Router>
    )
  }
}

export default App
