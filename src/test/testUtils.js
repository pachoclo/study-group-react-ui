export const setupMockLocalStorage = () => {
  // mock localStorage for all tests:
  // (https://stackoverflow.com/questions/32911630/how-do-i-deal-with-localstorage-in-jest-tests#answer-47897345)

  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn()
  }

  global._localStorage = localStorageMock
}
