module.exports = {
  resetMocks: true,
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*/index.js',
    '!**/node_modules/**',
  ],
  setupFilesAfterEnv: ['<rootDir>/tests/setupEnv.js'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/'],
  /*transform: {
    '^.+\\.[j|t]s?$': 'ts-jest',
  },*/
  transformIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tests/fileMock.js',
    '\\.(css|less)$': '<rootDir>/tests/fileMock.js',
  },
};
