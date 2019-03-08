import React from 'react'
import { Link } from 'react-router-dom'

const logout = (auth, history) => {
  auth.logout()
  history.push('/')
}

const Menu = ({ auth, history }) => {
  return (
    <>
      {!auth.isAuthenticated() && <button onClick={() => auth.login()}>Login</button>}
      {auth.isAuthenticated() && <button onClick={() => logout(auth, history)}>Logout</button>}

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
}

export default Menu
