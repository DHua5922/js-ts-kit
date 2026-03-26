const path = require("path");
const { dependencies = {} } = require("./package.json");

const dependencyNames = Object.keys(dependencies);

module.exports = {
  entry: "./src/index.ts", // indicate which module webpack should use to begin building out its internal dependency graph
  resolve: {
    extensions: [".ts", ".js"], // add .ts extension
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
          },
        }, // handle transpilation here and let tsc own declaration output
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // Webpack only understands JavaScript and JSON files. Loaders allow webpack to process other types of files and convert them into valid modules that can be used by your app and added to the dependency graph
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "dist"), // tell webpack where we want bundle to be emitted to
    globalObject: "this", // prevent error: self not defined
  },
  externals: dependencyNames, // treat runtime dependencies as external and keep the published bundle lean
};
