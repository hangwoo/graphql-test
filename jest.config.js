module.exports = {
  verbose: true,
  moduleFileExtensions: ["js", "ts", "tsx", "json"],
  moduleDirectories: [
    "node_modules",
    "src",
  ],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|html)$":
      "<rootDir>/__mocks__/fileMock.js",
  },
  modulePaths: ["<rootDir>/src"],
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
  testPathIgnorePatterns: ["/node_modules/"],
  transformIgnorePatterns: ["/node_modules/"],
  globals: {},
};
