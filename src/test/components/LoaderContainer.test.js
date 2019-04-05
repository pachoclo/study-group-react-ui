import React from 'react'
import { shallow } from 'enzyme'
import { LoaderContainer } from '../../components/LoaderContainer'

describe('LoaderContainer Test', () => {
  it('should reuturn null if not loading', () => {
    expect(shallow(<LoaderContainer loading={false} />)).toMatchSnapshot()
  })

  it('should render an AutoProgressLoader if loading', () => {
    expect(shallow(<LoaderContainer loading />)).toMatchSnapshot()
  })
})
