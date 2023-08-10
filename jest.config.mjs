import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  testEnvironment: 'jest-environment-jsdom',
  transformIgnorePatterns: [
    'node_modules/(?!(remark-unwrap-images|unist-util-visit|unist-util-visit-parents|unist-util-find-after|unist-util-is|hast-util-whitespace)/)',
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx|mjs)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  moduleNameMapper: {
    // react: 'next/dist/compiled/react/cjs/react.development.js',
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/service/(.*)$': '<rootDir>/src/service/$1',
    '^@/app/(.*)$': '<rootDir>/app/$1',
    //
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
