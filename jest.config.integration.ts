import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";


export default {
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
  bail: 1,
  preset: "ts-jest",
  testMatch: ["**/?(*.)+(ispec|test).[tj]s?(x)"],
  setupFiles: ["<rootDir>/jest.env.ts"],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
