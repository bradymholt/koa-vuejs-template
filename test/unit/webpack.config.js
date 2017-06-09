var webpack = require("webpack");
var path = require("path");

var config = {
  entry: {
    index: [
      path.join(__dirname, "index.ts")
    ]
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "build")
  },
  // This will output a [name].js.map file that has source line mappings and source content.
  // and will support Chrome debugger or VSCode debugger to be used.
  devtool: "cheap-source-map",
  resolve: {
    extensions: [".ts", ".js", ".vue"]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      }
    ]
  }
};

module.exports = config;
