export const setupMockLocalStorage = () => {
  // mock localStorage for all tests:
  // (https://stackoverflow.com/questions/32911630/how-do-i-deal-with-localstorage-in-jest-tests#answer-47897345)

  const storage = {}

  const localStorageMock = {
    getItem: jest.fn(itemName => storage[itemName]),
    setItem: jest.fn((itemName, item) => (storage[itemName] = item)),
    removeItem: jest.fn(),
    clear: jest.fn()
  }

  global._localStorage = localStorageMock
}
