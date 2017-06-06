var webpack = require("webpack");
var config = require("./webpack.config");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var package = require("../package.json");

// Extract the vue and vue-router dependency versions from package.json so that CDN url uses same version
let vueVersion = package.devDependencies["vue"].replace(/\^/,'');
let vueRouterVersion = package.devDependencies["vue-router"].replace(/\^/, '');

config.externals = {
  vue: 'Vue',
  'vue-router': 'VueRouter'
};
config.devtool = 'source-map';

// Note: We are *replacing* the plugin config here.
config.plugins = [
  new ExtractTextPlugin("styles.css"),
  new HtmlWebpackPlugin({
    template: path.join(__dirname, 'index.template.html'),
    inject: true,
    useCdn: true,
    vueVersion: vueVersion,
    vueRouterVersion: vueRouterVersion,
    minify: {
      collapseWhitespace: true,
      removeComments: true
    },
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    sourceMap: true
  })
];

module.exports = config;
