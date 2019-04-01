import React from 'react'
import ErrorAlert from '../../../components/layout/ErrorAlert'
import { shallow } from 'enzyme'

describe('ErrorAlert Test', () => {
  it('should render correctly', () => {
    const component = shallow(<ErrorAlert />)
    expect(component).toMatchSnapshot()
  })
})