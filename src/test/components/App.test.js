import React from 'react'
import App from '../../components/App'
import { Provider } from 'react-redux'
import store from '../../redux/store'
import { mount } from 'enzyme'
import authClient from '../../Auth/Auth'
import { act } from 'react-dom/test-utils'

jest.mock('../../components/Navbar', () => 'navbar-mock')
jest.mock('../../components/LoaderContainer', () => 'loader-container-mock')
jest.mock('../../components/LoginCallback', () => 'login-callback-mock')
jest.mock('../../components/Landing', () => 'landing-mock')
jest.mock('../../Auth/Auth')

describe('App Test', () => {
  it('should attempt to renewSession if the user is logged in', () => {
    authClient.isLoggedIn = jest.fn(() => true)
    authClient.renewSession = jest.fn(() => Promise.resolve())
    let app
    act(() => {
      app = mount(
        <Provider store={store}>
          <App />
        </Provider>
      )
    })
    expect(app).toMatchSnapshot()
    expect(authClient.renewSession).toHaveBeenCalled()
  })

  it('should render an error alert if an error occurred', () => {
    authClient.isLoggedIn = jest.fn(() => false)
    authClient.renewSession = jest.fn(() => Promise.resolve())

    store.getState = () => ({
      error: {
        err: 'EL TERRIBLE ERROR'
      }
    })

    let app
    act(() => {
      app = mount(
        <Provider store={store}>
          <App />
        </Provider>
      )
    })

    const elErrorAlert = app.find('ErrorAlert')
    expect(elErrorAlert.prop('error')).toEqual('EL TERRIBLE ERROR')
    expect(app).toMatchSnapshot()
    expect(authClient.renewSession).not.toHaveBeenCalled()
  })
})
