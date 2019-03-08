import React from 'react'

const LoginCallback = ({ auth, location, history }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth
      .handleAuthentication()
      .then(() => history.push('/'))
      .catch(() => history.push('/error'))
  }

  return <p>Authenticating...</p>
}

export default LoginCallback
