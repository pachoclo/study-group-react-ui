import React from 'react'
import ReactDOM from 'react-dom'
import App, { App as DisconnectedApp } from '../components/App'
import { Provider } from 'react-redux'
import store from '../redux/store'
import { shallow } from 'enzyme'
import authClient from '../Auth/Auth'

describe('App Test', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      div
    )
    ReactDOM.unmountComponentAtNode(div)
  })

  // it('should attempt to renewSession if the user is logged in', () => {
  //   jest.mock('../Auth/Auth')
  //   authClient.isLoggedIn = jest.fn(() => true)
  //   const renewSession = jest.fn()
  //   expect(shallow(<DisconnectedApp renewSession={renewSession} error={{}} />)).toMatchSnapshot()
  //   expect(renewSession).toHaveBeenCalled()
  //   // expect(renewSession).toHaveBeenCalled()
  //   const elError = { err: 'elErr', followUp: 'elFollowUp' }
  // })
})
