const nextJest = require("next/jest");

// Inisialisasi Jest dengan konfigurasi Next.js
const createJestConfig = nextJest({
  dir: "./", // direktori root proyek
});

// Konfigurasi khusus untuk Jest
const customJestConfig = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1", // dukung alias @/
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest", // gunakan Babel untuk transformasi modern JS
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/test/e2e/"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
};

module.exports = createJestConfig(customJestConfig);
