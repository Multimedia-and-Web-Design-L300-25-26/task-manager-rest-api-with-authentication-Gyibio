export default {
  testEnvironment: "node",
  // allow import/export syntax in tests and source files
  // node 18+ may require this env flag when running jest via npm scripts on Windows
  testRunner: "jest-circus/runner",
};
