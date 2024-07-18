module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./setupTests.ts'],
  testMatch: ['**/tests/**/*.test.ts'],
};
