const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./src/index.ts", // indicate which module webpack should use to begin building out its internal dependency graph
  output: {
    // tells webpack where to emit the bundles it creates and how to name these files
    path: path.resolve(__dirname, "dist"), // tell webpack where we want bundle to be emitted to
    filename: "index.js", // name of bundle
    globalObject: "this", // prevent error: self not defined
    library: {
      name: "js-ts-kit", // name of this library
      type: "umd", // allow this library to be used in other environments like CommonJS, AMD, Node.js, etc
    },
  },
  resolve: {
    extensions: [".ts", ".js"], // add .ts extension
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: "ts-loader", // use ts-loader for TypeScript files
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
  externals: [nodeExternals()], // treat all dependencies in package.json as external and not include them in the bundle
};
