import React from 'react'
import AutoProgressLoader from '../../components/AutoProgressLoader'
import { shallow, mount } from 'enzyme'
import { act } from 'react-dom/test-utils'

describe('AutoProgressLoader Test', () => {
  let container

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    document.body.removeChild(container)
    container = null
  })

  it('should trigger setInterval and clearInterval', () => {
    jest.useFakeTimers()
    let component
    act(() => {
      component = mount(<AutoProgressLoader intervalMillis={5} />)
    })
    expect(component).toMatchSnapshot()
    expect(setInterval).toHaveBeenCalled()

    act(() => {
      jest.advanceTimersByTime(3000)
    })

    act(() => {
      component.unmount()
    })
    expect(clearInterval).toHaveBeenCalled()
  })
})
