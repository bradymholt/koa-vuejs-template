import * as Koa from "koa";
import * as webpack from "webpack";
import * as koaWebpackDevMiddleware from "koa-webpack-dev-middleware";
import * as koaWebpackHotMiddleware from "koa-webpack-hot-middleware";

export default function boostrapWebpackMiddleware(
  app: Koa,
  webpackConfigFile: string
) {
  let webpackConfig = require(webpackConfigFile);

  webpackConfig.entry["main"].unshift("webpack-hot-middleware/client");
  webpackConfig.plugins.unshift(new webpack.HotModuleReplacementPlugin());
  webpackConfig.plugins.push(new webpack.NamedModulesPlugin());

  let compiler = webpack(webpackConfig);

  app
    .use(koaWebpackDevMiddleware(compiler))
    .use(koaWebpackHotMiddleware(compiler));
}
