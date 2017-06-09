var webpack = require("webpack");
var path = require("path");

var config = {
  entry: {
    index: [
      path.join(__dirname, "index.ts")
    ]
  },
  output: {
    filename: "[name].js"
  },
  devtool: "nosources-source-map",
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
