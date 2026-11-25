module.exports = {
  transform: {
    '^.+\\.ts?$': ['ts-jest', { tsconfig: 'tsconfig.spec.json' }],
  },
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  moduleNameMapper: {
    '^mezon-js-protobuf$': '<rootDir>/../mezon-js-protobuf/dist/mezon-js-protobuf-node.cjs.js',
  },
};
