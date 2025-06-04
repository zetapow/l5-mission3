export default {
   testEnvironment: "jsdom",
   transform: {
      "^.+\\.[jt]sx?$": ["babel-jest", { configFile: "./babel.config.cjs" }],
   },
   moduleFileExtensions: ["js", "jsx"],
   setupFilesAfterEnv: ["./jest.setup.js"],
};
