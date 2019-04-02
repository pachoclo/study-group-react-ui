export const AUTH_CONFIG = {
  domain: process.env.REACT_APP_AUTH_DOMAIN,
  audience: process.env.REACT_APP_AUTH_AUDIENCE,
  clientId: process.env.REACT_APP_AUTH_CLIENT_ID,
  callbackUrl: process.env.REACT_APP_AUTH_CALLBACK_URL,
  responseType: 'id_token token',
  scope: 'openid profile email',
  loginReturnToUrl: process.env.REACT_APP_AUTH_RETURN_URL
}
