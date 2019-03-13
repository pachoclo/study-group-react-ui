import React from 'react'
import authClient from '../Auth/Auth'

const About = () => {
  const isAuthenticated = authClient.isAuthenticated()
  return (
    <>
      <h2>About</h2>
      {isAuthenticated && <p>(c) Study Groupssss weee</p>}
      {!isAuthenticated && <p>Not logged In!!! Please login mr/mrs...</p>}
    </>
  )
}
export default About
