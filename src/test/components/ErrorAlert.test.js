import React from 'react'
import ErrorAlert from '../../components/ErrorAlert'
import { shallow } from 'enzyme'

describe('ErrorAlert Test', () => {
  it('should render correctly', () => {
    const component = shallow(<ErrorAlert error={'elError'} />)
    expect(component).toMatchSnapshot()
  })
})
