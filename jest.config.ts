import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jest-environment-jsdom',
  // Add more setup options before each test is run
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
  },
};

export default createJestConfig(config);
