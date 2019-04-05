import React from 'react'
import { shallow } from 'enzyme'
import { Navbar } from '../../components/Navbar'

describe('Landing Test', () => {
  it('should render correctly', () => {
    expect(shallow(<Navbar />)).toMatchSnapshot()
  })

  it('should render the avatar (and menu) component if authenticated', () => {
    expect(shallow(<Navbar isAuthenticated />)).toMatchSnapshot()
  })
})
