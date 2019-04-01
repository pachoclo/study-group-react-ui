import React from 'react'
import { TopLevelLoader } from '../../components/TopLevelLoader'
import { shallow } from 'enzyme'

describe('TopLevelLoader Test', () => {
  it('should render a fragment with default state', () => {
    expect(shallow(<TopLevelLoader />)).toMatchSnapshot()
  })

  it('should render correctly when loading set to true', () => {
    expect(shallow(<TopLevelLoader loading />)).toMatchSnapshot()
  })

  it('should render a fragment when loading set to false', () => {
    expect(shallow(<TopLevelLoader loading={false} />)).toMatchSnapshot()
  })
})
