import React from 'react'
import { LoginCallback } from '../../components/LoginCallback'
import { shallow } from 'enzyme'

describe('LoginCallback Test', () => {
  const locationMock = {
    hash: 'access_token'
  }

  it('should render correctly with default state', () => {
    const handleLoginResponseMock = jest.fn()
    const props = {
      isAuthenticated: false,
      location: locationMock,
      handleLoginResponse: handleLoginResponseMock
    }
    const component = shallow(<LoginCallback {...props} />)
    expect(handleLoginResponseMock).toHaveBeenCalled()
    expect(component).toMatchSnapshot()
  })

  it('should render a redirect if the user is authenticated', () => {
    const handleLoginResponseMock = jest.fn()
    const props = {
      isAuthenticated: true,
      location: { hash: 'locationMock' },
      handleLoginResponse: handleLoginResponseMock
    }
    const component = shallow(<LoginCallback {...props} />)
    expect(handleLoginResponseMock).not.toHaveBeenCalled()
    expect(component).toMatchSnapshot()
  })
})
