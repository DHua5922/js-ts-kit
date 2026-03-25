import type { Config } from "jest";

const config: Config = {
  testEnvironment: "node",
  roots: ["<rootDir>/tests"],
  testMatch: ["**/*.test.ts"],
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        tsconfig: {
          module: "commonjs",
          target: "es2019",
        },
      },
    ],
  },
  collectCoverageFrom: ["src/**/*.ts"],
  moduleFileExtensions: ["ts", "js", "json"],
};

export default config;
