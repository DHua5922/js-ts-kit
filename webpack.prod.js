// See Prepare JavaScript Library For Production in References section

const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = [
  merge(common, {
    mode: "production",
    devtool: "source-map",
    externalsType: "commonjs",
    output: {
      filename: "index.cjs",
      library: {
        type: "commonjs2",
      },
    },
  }),
  merge(common, {
    mode: "production",
    devtool: "source-map",
    experiments: {
      outputModule: true,
    },
    externalsType: "module",
    output: {
      filename: "index.mjs",
      module: true,
      library: {
        type: "module",
      },
    },
  }),
];
