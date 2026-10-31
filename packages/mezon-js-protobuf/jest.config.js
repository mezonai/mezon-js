module.exports = {
  transform: {
    '^.+\\.ts?$': ['ts-jest', { tsconfig: 'tsconfig.spec.json' }],
  },
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
};
