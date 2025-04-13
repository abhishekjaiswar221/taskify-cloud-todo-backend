import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
export default {
  input: "src/index.js",
  output: {
    file: "build/main.js",
    format: "es",
  },
  external: [/node_modules/], // <-- Add `node_modules` as regex
  plugins: [
    nodeResolve(), // <-- Resolver to handle node modules
    commonjs(),
  ],
};
