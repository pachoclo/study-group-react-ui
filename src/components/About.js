import React from 'react'

const About = ({ auth }) => (
  <>
    <h2>About</h2>
    {auth.isAuthenticated() && <p>(c) Study Groupssss weee</p>}
    {!auth.isAuthenticated() && <p>Not logged In!!! Please login mr/mrs...</p>}
  </>
)

export default About
