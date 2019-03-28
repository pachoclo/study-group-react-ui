import React from 'react'
import LoginCallback from '../../components/LoginCallback'

import { shallow, mount, render } from 'enzyme'

describe('LoginCallback Test', () => {
  it('should render correctly with default state', () => {
    const component = shallow(<LoginCallback isAuthenticated={true} />)

    expect(component).toMatchSnapshot()
  })
})
