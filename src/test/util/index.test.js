import { preventDefault, setAuthToken, debug } from '../../util'
import axios from 'axios'

describe('Util functions Test', () => {
  describe('preventDefault', () => {
    it('should wrap the passed function and prevent event default', () => {
      const callOrder = []

      const mockEvent = {
        preventDefault: jest.fn(() => callOrder.push('preventDefault'))
      }

      const eventHandler = jest.fn(() => callOrder.push('eventHandler'))
      const wrappedEventHandler = preventDefault(eventHandler)

      wrappedEventHandler(mockEvent)

      expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1)
      expect(eventHandler).toHaveBeenCalledTimes(1)
      expect(callOrder).toEqual(['preventDefault', 'eventHandler'])
    })
  })

  describe('setAuthToken', () => {
    jest.mock('axios')

    it("should set axios' Authorization header if a token is given", () => {
      const superToken = 'elSuperAuthToken'
      setAuthToken(superToken)
      expect(axios.defaults.headers.common['Authorization']).toEqual(`Bearer ${superToken}`)
    })

    it("should unset axios' Authorization header if token is null ", () => {
      setAuthToken()
      expect(axios.defaults.headers.common['Authorization']).toBeUndefined()
    })
  })

  describe('debug() test', () => {
    it('should console log only when in dev mode', () => {
      const consoleLogSpy = jest.spyOn(console, 'log')
      process.env.NODE_ENV = 'development'
      debug('el log message')
      expect(consoleLogSpy).toHaveBeenCalled()
    })
  })
})
