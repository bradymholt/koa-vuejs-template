var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var path = require("path");

var config = {
  entry: {
    main: [path.join(__dirname, "boot.ts")]
  },
  output: {
    path: path.join(__dirname, "../api/build/public"),
    filename: "[name].js",
    publicPath: "/"
  },
  devtool: "inline-source-map",
  resolve: {
    extensions: [".ts", ".js", ".vue", ".styl", ".css"]
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
        loader: "vue-loader",
        options: {
          loaders: {
            stylus: ExtractTextPlugin.extract({
              fallback: "vue-style-loader",
              use: [
                {
                  loader: "css-loader",
                  options: {
                    sourceMap: true,
                    minimize: true
                  }
                },
                {
                  loader: "stylus-loader"
                }
              ]
            })
          }
        }
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader?limit=100000"
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      disable: true
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "index.template.html"),
      inject: true
    })
  ]
};

module.exports = config;
