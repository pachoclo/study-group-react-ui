import React from 'react'

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

export default Home
