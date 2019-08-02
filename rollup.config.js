import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import copy from "rollup-plugin-copy";

export default {
  input: "./src/main.js",
  output: {
    sourcemap: true,
    inputSourceMap: true,
    file: "./public/js/main.js",
    format: "iife",
    name: "bundle",
    globals: {
      phaser: "Phaser",
    },
  },
  external: ["phaser"],
  watch: {
    include: "src/**",
  },
  plugins: [
    babel({
      exclude: "node_modules/**",
    }),
    resolve(),
    commonjs(),
    copy({
      targets: [{ src: "node_modules/phaser/dist/phaser.js", dest: "public/js/" }],
    }),
  ],
};
