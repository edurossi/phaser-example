import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

export default {
  input: "./src/main.js",
  output: {
    sourcemap: true,
    inputSourceMap: true,
    file: "./public/main.min.js",
    format: "iife",
    name: "bundle",
  },
  plugins: [
    babel({
      exclude: "node_modules/**",
    }),
    resolve(),
    commonjs(),
  ],
};
