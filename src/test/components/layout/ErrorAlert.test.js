import React from 'react'
import ErrorAlert from '../../../components/layout/ErrorAlert'
import { shallow } from 'enzyme'

describe('ErrorAlert Test', () => {
  it('should render correctly', () => {
    const component = shallow(<ErrorAlert error={{ error: 'elError' }} />)
    expect(component).toMatchSnapshot()
  })
})
