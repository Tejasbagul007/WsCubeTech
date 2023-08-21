// mock-async-storage.js
export default {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
  };
  
  jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);