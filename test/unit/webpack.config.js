const webpack = require("webpack");
const path = require("path");
const fs = require("fs");
const nodeExternals = require('webpack-node-externals');

const sourceTestDir = path.resolve('./components');
var config = {
  externals: [nodeExternals({ modulesDir: path.join(__dirname, '../../node_modules')})],
  // This will output a [name].js.map file that has source line mappings and source content.
  // and will support Chrome debugger or VSCode debugger to be used.
  target: "node",
  devtool: "cheap-module-eval-source-map",
  resolve: {
    extensions: [".ts", ".js", ".vue"],
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
