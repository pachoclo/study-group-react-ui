import React from 'react'
import { LoginCallback } from '../../components/LoginCallback'
import { shallow } from 'enzyme'

describe('LoginCallback Test', () => {
  it('should render correctly with default state', () => {
    const handleLoginResponseMock = jest.fn()
    const props = {
      isAuthenticated: false,
      location: {
        hash: 'access_token'
      },
      handleLoginResponse: handleLoginResponseMock
    }
    const component = shallow(<LoginCallback {...props} />)
    expect(handleLoginResponseMock).toHaveBeenCalled()
    expect(component).toMatchSnapshot()
  })

  it('should redirect if url does not contain the token', () => {
    const handleLoginResponseMock = jest.fn()
    const regexTestSpy = jest.spyOn(RegExp.prototype, 'test')
    const props = {
      isAuthenticated: false,
      location: {
        hash: null
      },
      handleLoginResponse: handleLoginResponseMock
    }
    const component = shallow(<LoginCallback {...props} />)
    expect(handleLoginResponseMock).not.toHaveBeenCalled()
    expect(regexTestSpy).toHaveBeenCalled()
    expect(component).toMatchSnapshot()
  })

  it('should render a redirect if the user is authenticated', () => {
    const handleLoginResponseMock = jest.fn()
    const props = {
      isAuthenticated: true,
      location: { hash: null },
      handleLoginResponse: handleLoginResponseMock
    }
    const component = shallow(<LoginCallback {...props} />)
    expect(handleLoginResponseMock).not.toHaveBeenCalled()
    expect(component).toMatchSnapshot()
  })
})
