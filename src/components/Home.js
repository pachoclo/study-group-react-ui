import React from 'react'
import { connect } from 'react-redux'
import {} from '../store/actions/authActions'

const Home = ({ isAuthenticated, profile }) => (
  <>
    <h2>Home</h2>
    {isAuthenticated && (
      <>
        <p>La casaa</p>
        <p>Profile:</p>
        <pre> {JSON.stringify(profile, null, 2)}</pre>
      </>
    )}
    {!isAuthenticated && <p>Not logged In!!! Please login mr/mrs...</p>}
  </>
)

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.authenticated,
  profile: auth.profile
})

export default connect(mapStateToProps)(Home)
