import React from 'react'
import { LoaderContainer } from '../../components/LoaderContainer'
import { shallow } from 'enzyme'

describe('TopLevelLoader Test', () => {
  it('should return null with default state', () => {
    expect(shallow(<LoaderContainer />)).toMatchSnapshot()
  })

  it('should render an AutoProgressLoader when loading set to true', () => {
    expect(shallow(<LoaderContainer loading />)).toMatchSnapshot()
  })

  it('should return null when loading set to false', () => {
    expect(shallow(<LoaderContainer loading={false} />)).toMatchSnapshot()
  })
})
