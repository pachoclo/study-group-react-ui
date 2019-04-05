import React from 'react'
import { shallow } from 'enzyme'
import { Landing } from '../../components/Landing'

describe('Landing Test', () => {
  it('should render correctly', () => {
    expect(shallow(<Landing />)).toMatchSnapshot()
  })

  it('should not render a login button if authenticated', () => {
    expect(shallow(<Landing isAuthenticated />)).toMatchSnapshot()
  })

  it('should not render a login button if loading', () => {
    expect(shallow(<Landing loading />)).toMatchSnapshot()
  })
})
