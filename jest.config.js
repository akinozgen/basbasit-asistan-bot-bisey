export default {
  testEnvironment: 'node',
  testMatch: ['**/*.test.js'],
  globals: {
    test: global.test || undefined,
    expect: global.expect || undefined,
  },
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  testTimeout: 30000,
};
